<script>
  export let src
  export let title
  export let classes
  export let align
  let alignClasses = ""

  if (align == "left") {
    alignClasses = "md:float-left md:mr-4 my-4 md:my-0 mx-auto"
  } 
  else if (align == "right") {
    alignClasses = "md:float-right md:ml-4 my-4 md:my-0 mx-auto"
  }
  else {
    alignClasses = "mx-auto"
  }
</script>

<figure class="py-2 md:py-0 overflow-y-auto">
  <a href={ src } rel=external>
    <img src='{ src }' data-src='{ src }'
      alt='{ title ? title : src }'
      title='{ title }'
      class="shadow { classes } {alignClasses}"
    >
  </a>
</figure>
