# Feature Flag UI Task!

Below is a screenshot of a panel used to manage features and account limits
along with notes on how it should behave. Develop a react component based on the
screenshot and additional notes provided.

## UI Rules

1.  Toggles either sit in a group or their own
2.  They can sometimes have an additional input such as numeric dropdowns
    against the toggle
3.  Some features have a parent child relationship e.g. users > users add
4.  If a parent toggle is enabled, the child toggles should be expanded and
    displayed providing the ability to toggle them off/on
5.  If a parent toggle is disabled, the child toggles should be disabled and
    then collapsed

## Completing the task

1.  Use TypeScript
2.  A dynamic schema should be provided to drive the form. The input wording and
    response should not be hardcoded into the UI
3.  It doesn't have to fully reflect the UI; this task should give us a sense of
    your coding style and an insight into how you would structure a react app
4.  This can run on ReactDOM.render() on a single page for demo purposes
5.  If you wanted to replicate the UI font is "Industry"
6.  Tests are not a requirement but would be a good bonus

## Returning the code

- Code can either be shared using a link to a public git repo or as a zip file
