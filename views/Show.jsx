const React = require('react')
class Show extends React.Component {
   render () {
    return (
      <div>
        <link rel="stylesheet" href="/css/app.css"/>
      <h1>Fruits show page</h1>
      <p>The { this.props.fruit.name } is { this.props.fruit.color }.  
{ this.props.fruit.readyToEat ? ` It is ready to eat.` : ` It is not ready to eat.` }</p>
<a href={`/fruits`}>Back to All Fruits</a>
  </div>
      );
    }
 }
 module.exports  = Show