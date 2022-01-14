<script>
  let variableName = "This is today's date and time:"
  let currentDate = new Date();
  export let passedIn = ""
</script>

<div class="text-green-300">
  {variableName}: {currentDate.toLocaleString()}<br/>
  <span class="text-blue-300">And this is the string passed into this component, <strong class="text-indigo-600">"{passedIn}"</strong>.</span>
</div>