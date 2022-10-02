---
title: Grid filtering/search
sticky: 999
comments: true
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: false
tocOpen: true
indexing: true
display_tag_onHome: true
recommendedSection: false
donate: false
swiper: false
geolocation: 'Tokyo, Japan'
copyright: true
mathjax: false
share: true
tags:
  - migrated from rBlogger.2009
  - Javascript
  - Sencha
categories:
  - Work_仕事
  - Programming_開発
  - Javascript
  - ExtJS
date: 2010-08-31 14:06:25
---

 Must read!<br><br>​http://gridsearch.extjs.eu/<br>
 http://www.sencha.com/forum/showthread.php?23615-Grid-Search-Plugin&amp;highlight=page bar<br>
 http://www.sencha.com/forum/showthread.php?14503-Grid-Filter-(Plugin)&amp;highlight=page bar<br><br>
 http://www.sencha.com/forum/showthread.php?41658-Grid-header-filters<br><br>
 http://www.vinylfox.com/grid-filter-php-backend-code/
 
 
 
 Even better!!<br><br>
 
 http://triin.net/temp/filter-row/
 http://github.com/nene/filter-row
 
{% codeblock "Ext JS FilterRow plugin" lang:JavaScript http://github.com/nene/filter-row %}

/*!
 * Ext JS FilterRow plugin v0.5
 * http://github.com/nene/filter-row
 *
 * Copyright 2010 Rene Saarsoo
 * Licensed under GNU General Public License v3.
 * http://www.gnu.org/licenses/
 */
Ext.namespace('Ext.ux.grid');

/
 * @class Ext.ux.grid.FilterRow
 * @extends Ext.util.Observable
 * 
 * Grid plugin that adds filtering row below grid header.
 * 
 * 
To add filtering to column, define "filter" property in column
 * to be FilterRowFilter configuration object or an instance of it.
 * 
 * 

Example:
 * 
 * pre/code
var grid = new Ext.grid.GridPanel({
  columns: [
    {
      header: 'Name',
      dataIndex: 'name',
      // Filter by regular expression
      // {0} will be substituted with current field value
      filter: {
        test: "/{0}/i"
      }
    },
    {
      header: 'Age',
      dataIndex: 'age',
      filter: {
        // Show larger ages than the one entered to field
        test: function(filterValue, value) {
          return value > filterValue;
        }
      }
    }
  ],
  plugins: ["filterrow"],
  ...
});
 * /code/pre
 */
Ext.ux.grid.FilterRow = Ext.extend(Ext.util.Observable, {
  /**
   * @cfg {Boolean} autoFilter
   * false, to turn automatic filtering off. (default true)
   */
  autoFilter: true,
  
  /
   * @cfg {Boolean} refilterOnStoreUpdate
   * true to refilter store when records added/removed. (default false)
   */
  refilterOnStoreUpdate: false,
  
  constructor: function(conf) {
    Ext.apply(this, conf || {});
    
    this.addEvents(
      /
       * @event change
       * Fired when any one of the fields is changed.
       * @param {Object} filterValues object containing values of all
       * filter-fields.  When column has "id" defined, then property
       * with that ID will hold filter value.  When no "id" defined,
       * then dataIndexes are used.  That is, you only need to specify
       * ID-s for columns, when two filters use the same dataIndex.
       */
      "change"
    );
    if (this.listeners) {
      this.on(this.listeners);
    }
  },
  
  init: function(grid) {
    this.grid = grid;
    var cm = grid.getColumnModel();
    var view = grid.getView();
    
    // For some reason GridView was changed in Ext 3.3 to completely
    // re-render grid header on store "datachanged" event (which is
    // fired after each loading/filtering/sorting).  Because this
    // re-rendering seems completely unnecessary and coding around it
    // quite hard (each time user types a character into field we have
    // to re-insert fields to the header and recover the lost focus,
    // which I couldn't get working with IE), I've decided to just
    // override the onDataChange method with Ext 3.2 version.
    // See also: http://www.sencha.com/forum/showthread.php?118510
    view.onDataChange = function() {
      this.refresh(); // this was: this.refresh(true);
      this.updateHeaderSortState();
      this.syncFocusEl(0);
    };
    
    // convert all filter configs to FilterRowFilter instances
    var Filter = Ext.ux.grid.FilterRowFilter;
    this.eachFilterColumn(function(col) {
      if (!(col.filter instanceof Filter)) {
        col.filter = new Filter(col.filter);
      }
      col.filter.on("change", this.onFieldChange, this);
    });
    
    this.applyTemplate();
    // add class for attatching plugin specific styles
    grid.addClass('filter-row-grid');
    
    // when grid initially rendered
    grid.on("render", this.renderFields, this);
    
    // when Ext grid state restored (untested)
    grid.on("staterestore", this.resetFilterRow, this);
    
    // when the width of the whole grid changed
    grid.on("resize", this.resizeAllFilterFields, this);
    // when column width programmatically changed
    cm.on("widthchange", this.onColumnWidthChange, this);
    // Monitor changes in column widths
    // newWidth will contain width like "100px", so we use parseInt to get rid of "px"
    view.onColumnWidthUpdated = view.onColumnWidthUpdated.createSequence(function(colIndex, newWidth) {
      this.onColumnWidthChange(this.grid.getColumnModel(), colIndex, parseInt(newWidth, 10));
    }, this);
    
    // when column is moved, remove fields, after the move add them back
    cm.on("columnmoved", this.resetFilterRow, this);
    view.afterMove = view.afterMove.createSequence(this.renderFields, this);
    
    // when column header is renamed, remove fields, afterwards add them back
    cm.on("headerchange", this.resetFilterRow, this);
    view.onHeaderChange = view.onHeaderChange.createSequence(this.renderFields, this);
    
    // When column hidden or shown
    cm.on("hiddenchange", this.onColumnHiddenChange, this);
    
    if (this.refilterOnStoreUpdate) {
      this.respectStoreFilter();
    }
  },
  
  // Makes store add() and load() methods to respect filtering.
  respectStoreFilter: function() {
    var store = this.grid.getStore();
    
    // re-apply filter after store load
    store.on("load", this.refilter, this);
    
    // re-apply filter after adding stuff to store
    this.refilterAfter(store, "add");
    this.refilterAfter(store, "addSorted");
    this.refilterAfter(store, "insert");
  },
  
  // Appends refiltering action to after store method
  refilterAfter: function(store, method) {
    var filterRow = this;
    store[method] = store[method].createSequence(function() {
      if (this.isFiltered()) {
        filterRow.refilter();
      }
    });
  },
  
  onColumnHiddenChange: function(cm, colIndex, hidden) {
    var filterDiv = Ext.get(this.getFilterDivId(cm.getColumnId(colIndex)));
    if (filterDiv) {
      filterDiv.parent().dom.style.display = hidden ? 'none' : '';
    }
    this.resizeAllFilterFields();
  },
  
  applyTemplate: function() {
    var colTpl = "";
    this.eachColumn(function(col) {
      var filterDivId = this.getFilterDivId(col.id);
      var style = col.hidden ? " style='display:none'" : "";
      var icon = (col.filter && col.filter.showFilterIcon) ? "filter-row-icon" : "";
      colTpl  = '<td' style=""  =""></td'></p><div class="x-small-editor '   icon   '" id="'   filterDivId   '"></div></pre></td>';
    });
    
    var headerTpl = new Ext.Template(
      '<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
      '<thead><tr class="x-grid3-hd-row">{cells}>/tr>>/thead>',
      '<tbody><tr class="filter-row-header">',
      colTpl,
      '</tr></tbody>',
      "</table>"
    );
    
    var view = this.grid.getView();
    Ext.applyIf(view, { templates: {} });
    view.templates.header = headerTpl;
  },
  
  // Removes filter fields from grid header and recreates
  // template. The latter is needed in case columns have been
  // reordered.
  resetFilterRow: function() {
    this.eachFilterColumn(function(col) {
      var editor = col.filter.getField();
      if (editor && editor.rendered) {
        var el = col.filter.getFieldDom();
        el.parentNode.removeChild(el);
      }
    });
    this.applyTemplate();
  },
  
  renderFields: function() {
    this.eachFilterColumn(function(col) {
      var filterDiv = Ext.get(this.getFilterDivId(col.id));
      var editor = col.filter.getField();
      editor.setWidth(col.width - 2);
      if (editor.rendered) {
        filterDiv.appendChild(col.filter.getFieldDom());
      }
      else {
        editor.render(filterDiv);
      }
    });
  },
  
  onFieldChange: function() {
    if (this.hasListener("change")) {
      this.fireEvent("change", this.getFilterData());
    }
    
    if (this.autoFilter) {
      this.grid.getStore().filterBy(this.getFilterFunction());
    }
  },
  
  // refilters the store with current filter.
  refilter: function() {
    this.grid.getStore().filterBy(this.getFilterFunction());
  },
  
  // collects values from all filter-fields into hash that maps column
  // dataindexes (or id-s) to filter values.
  getFilterData: function() {
    var data = {};
    this.eachFilterColumn(function(col) {
      // when column id is numeric, assume it's autogenerated and use
      // dataIndex.  Otherwise assume id is user-defined and use it.
      var name = (typeof col.id === "number") ? col.dataIndex : col.id;
      data[name] = col.filter.getFieldValue();
    });
    return data;
  },
  
  /**
   * Returns store filtering function for the current values in filter
   * fields.
   * 
   * @return {Function}  function to use with store.filterBy()
   */
  getFilterFunction: function() {
    var tests = [];
    this.eachFilterColumn(function(col) {
      var p = col.filter.createPredicate(col.dataIndex);
      if (p) {
        tests.push(p);
      }
    });
    
    return function(record) {
      for (var i=0; ii)="" false;="" true;="" };="" oncolumnwidthchange:="" function(cm,="" colindex,="" newwidth)="" col="cm.getColumnById(cm.getColumnId(colIndex));" newwidth);="" forcefit:="" true,="" then="" all="" columns="" be="" when="" grid="" resized="" added="" removed.="" resizeallfilterfields:="" function()="" cm="this.grid.getColumnModel();" this.eachfiltercolumn(function(col,="" this.resizefilterfield(col,="" cm.getcolumnwidth(i));="" resizes="" according="" width="" resizefilterfield:="" function(column,="" newcolumnwidth)="" var="" editor="column.filter.getField();" editor.setwidth(newcolumnwidth="" 2);="" returns="" html="" id="" element="" containing="" div="" getfilterdivid:="" function(columnid)="" return="" this.grid.id="" -filter-="" columnid;="" that="" has="" eachfiltercolumn:="" this.eachcolumn(function(col,="" i)="" if="" (col.filter)="" func.call(this,="" col,="" i);="" },="" iterates="" over="" in="" array="" eachcolumn:="" function(func)="" ext.each(this.grid.getcolumnmodel().config,="" func,="" this);="" }="" });="" ext.preg(="" ,="" ext.ux.grid.filterrow);="" @class="" @extends="" ext.util.observable="" class="" encapsulates="" definition="" column.="" ext.ux.grid.filterrowfilter="" {="" {ext.form.field}="" instance="" some="" form="" field="" use="" for="" filtering,="" or="" just="" a="" config="" object="" -="" xtype="" .="" defaults="" textfield="" enablekeyevents="" set="" true.="" field:="" undefined,="" {[string]}="" fieldevents="" names="" listen="" from="" field.="" each="" time="" one="" of="" events="" heard,="" filterrow="" will="" filter="" grid.="" by="" it="" contains="" event="" to="" provide="" useful="" together="" with="" the="" default="" textfield.="" fieldevents:="" [="" keyup="" ],="" **="" @cfg="" {string="" function}="" test="" determines="" how="" this="" column="" is="" filtered.="" *="">

When it's a string like "/^{0}/i", a regular expression filter
   * is created - substituting "{0}" with current value from field.
   * 
   * 

When it's a function, it will be called with three arguments:
   * 
   * 


   * 
filterValue - the current value of field,
   * 
value - the value from record at dataIndex,
   * 
record - the record object itself.
   * 

   * 
   * 
When function returns true, the row will be filtered in,
   * otherwise excluded from grid view.
   * 
   * 

Defaults to "/{0}/i".
   */
  test: "/{0}/i",
  
  /**
   * @cfg {Object} scope
   * Scope for the test function.
   */
  scope: undefined,
  
  /
   * @cfg {Boolean} showFilterIcon
   * By default a magnifier-glass icon is shown inside filter field.
   * Set this to false, to disable that behaviour. (Default is true.)
   */
  showFilterIcon: true,
  
  constructor: function(config) {
    Ext.apply(this, config);
    
    if (!this.field) {
      this.field = new Ext.form.TextField({enableKeyEvents: true});
    }
    else if (!(this.field instanceof Ext.form.Field)) {
      this.field = Ext.create(this.field, "textfield");
    }
    
    this.addEvents(
      /
       * @event change
       * Fired when ever one of the events listed in "events" config
       * option is fired by field.
       */
      "change"
    );
    Ext.each(this.fieldEvents, function(event) {
      this.field.on(event, this.fireChangeEvent, this);
    }, this);
  },
  
  fireChangeEvent: function() {
    this.fireEvent("change");
  },
  
  /**
   * Returns the field of this filter.
   * 
   * @return {Ext.form.Field}
   */
  getField: function() {
    return this.field;
  },
  
  /
   * Returns DOM Element that is the root element of form field.
   * 
   * 

For most fields, this will be the "el" property, but
   * TriggerField and it's descendants will wrap "el" inside another
   * div called "wrap".
   * 
   * @return {HTMLElement}
   */
  getFieldDom: function() {
    return this.field.wrap ? this.field.wrap.dom : this.field.el.dom;
  },
  
  /**
   * Returns the value of filter field.
   * 
   * @return {Anything}
   /
  getFieldValue: function() {
    return this.field.getValue();
  },
  
  /**
   * Creates predicate function for filtering the column associated
   * with this filter.
   * 
   * @param {String} dataIndex
   * @return {Function}
   /
  createPredicate: function(dataIndex) {
    var test = this.test;
    var filterValue = this.field.getValue();
    
    // is test a regex string?
    if (typeof test === "string" && test.match(/^\\/.\\/[img]$/)) {
      return this.createRegExpPredicate(test, filterValue, dataIndex);
    }
    else {
      // otherwise assume it's a function
      var scope = this.scope;
      return function(r) {
        return test.call(scope, filterValue, r.get(dataIndex), r);
      };
    }
  },
  
  createRegExpPredicate: function(reString, filterValue, dataIndex) {
    // don't filter the column at all when field is empty
    if (!filterValue) {
      return false;
    }
    
    var regex = this.createRegExp(reString, filterValue);
    return function(r) {
      return regex.test(r.get(dataIndex));
    };
  },
  
  // Given string "/^{0}/i" and value "foo" creates regex: /^foo/i
  createRegExp: function(reString, value) {
    // parse the reString into pattern and flags
    var m = reString.match(/^\\/(.)\\/([img])$/);
    var pattern = m[1];
    var flags = m[2];
    // Create new RegExp substituting value inside pattern
    return new RegExp(String.format(pattern, Ext.escapeRe(value)), flags);
  }
});
{% endcodeblock %}



{% codeblock "Init filter on HTML page" lang:JavaScript %}
Ext.onReady(function() {
  var store = new Ext.data.JsonStore({
    url: "getdata.php",
    root: "rows",
    baseParams: {limit: 10},
    autoLoad: true,
    fields: [
      {name: 'company'},
      {name: 'price'},
      {name: 'change'}
    ]
  });
  
  // Custom filtering with remote store.
  // Each time filers change, send values of each filter field to
  // server and reload store with the result.
  var filterRow = new Ext.ux.grid.FilterRow({
    autoFilter: false,
    listeners: {
      change: function(data) {
        store.load({
          params: data
        });
      }
    }
  });
  
  var grid = new Ext.grid.GridPanel({
    store: store,
    columns: [
      {
        id: 'company',
        header: 'Company',
        width: 160,
        sortable: true,
        dataIndex: 'company',
        filter: {
        }
      },
      {
        header: 'Price',
        width: 75,
        sortable: true,
        renderer: 'usMoney',
        align: "right",
        dataIndex: 'price',
        filter: {
        }
      },
      {
        header: 'Change',
        width: 75,
        sortable: true,
        dataIndex: 'change',
        filter: {
          // hide filtering icon, just to demonstrate the possibility
          showFilterIcon: false
        }
      }
    ],
    plugins: [filterRow],
    stripeRows: true,
    autoExpandColumn: 'company',
    height: 350,
    width: 450,
    title: 'Filtering with remote store',
    renderTo: "remote-grid-container"
  });
  
});


{% endcodeblock %}



{% codeblock "Define your grid on HTML page" lang:JavaScript %}
Ext.onReady(function() {
  var Company = Ext.data.Record.create([
    'company',
    'price',
    'change'
  ]);
  
  var store = new Ext.data.JsonStore({
    url: "getdata.php",
    root: "rows",
    autoLoad: true,
    fields: Company,
    sortInfo: {field: "company", direction: 'ASC'}
  });
  store.load();
  
  var filterRow = new Ext.ux.grid.FilterRow({
    // automatically refilter store when records are added
    refilterOnStoreUpdate: true
  });
  
  var grid = new Ext.grid.GridPanel({
    store: store,
    columns: [
      {
        id: 'company',
        header: 'Company',
        width: 160,
        sortable: true,
        dataIndex: 'company',
        filter: {
          // Filter by string beginnings,
          // the default is to filter by occurance ("/{0}/i")
          test: "/^{0}/i"
        }
      },
      {
        header: 'Price',
        width: 75,
        sortable: true,
        renderer: 'usMoney',
        align: "right",
        dataIndex: 'price',
        filter: {
          // find prices greater than filter value
          test: function(filterValue, value, record) {
            return  value >=  filterValue;
          }
        }
      },
      {
        header: 'Change',
        width: 75,
        sortable: true,
        dataIndex: 'change',
        filter: {
          field: {
            xtype: "combo",
            mode: 'local',
            store: new Ext.data.ArrayStore({
              id: 0,
              fields: [
                'value'
              ],
              data: [['-'], ['up'], ['none'], ['down']]
            }),
            valueField: 'value',
            displayField: 'value',
            triggerAction: 'all',
            value: "-"
          },
          fieldEvents: ["select"],
          test: function(filterValue, value, record) {
            return filterValue === "-" || filterValue === value;
          }
        }
      }
    ],
    plugins: [filterRow],
    stripeRows: true,
    autoExpandColumn: 'company',
    height: 350,
    width: 450,
    title: 'Filtering with local store',
    renderTo: "local-grid-container",
    bbar: [
      {
        text: "Reload",
        handler: function() {
          store.load();
        }
      },
      {
        text: "Add",
        handler: function() {
          store.addSorted(new Company({
            company: "Google Inc",
            price: 150.7,
            change: "up"
          }));
        }
      }
    ]
  });
  
  // For testing that column header renaming works
  document.getElementById("button").onclick = function() {
    grid.getColumnModel().setColumnHeader(1, "Hello");
  };
  
});
{% endcodeblock %}
