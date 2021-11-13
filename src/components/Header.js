import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

{/* import React from 'react' //used to be required, but not needed anymore!*/}
const Header = ({ title, onAdd, showAdd }) => {
    return (
        <header className='header'> {/* in the CSS, header is the class name. applies flexbox and aligns it.*/}
            <h1>{title}</h1>
                <Button 
                    color={showAdd ? 'red' : 'green'}
                    text={showAdd ? 'Close' : 'Add'}
                    onClick={onAdd}
                />
            {/* REUSABLE COMPONENTS EXAMPLE
            <Button color='green' text='Hello 1'/>
            <Button color='blue' text='Hello 2'/>
            <Button color='red' text='Hello 3'/>
            Reuse same components with  different props.
            */}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

//TODO all line references below need updated
//! props example + default example in lines 20-22, changes to lines 12 and 15.
{/* const Header = (props) => { //if defaulting, in lines 20-22, props in this line would become ({ title })
    return (
        <div className='containers'>
            <h1>{props.title}</h1> //if this has no title in App.js line 14, it would default to whatever is in lines 20-22, line 15 would be "<h1>{title}</h1>" and line 12 parameter changes
        </div>
    )
}                 */}

// Header.defaultProps = { //object 20-22
//     title: 'Task Tracker',
// }

// // old class extension method
// class App extends React.Component {
//     render() {
//         return <h1>Hell from a class</h1>
//     }
// }

//!propType example | built in type system for your properties. don't have to use, but helps you out and makes your code more robust.
// impt to import propTypes with extension
// import PropTypes from 'prop-types' //goes at top of page
// Header.propTypes = { //set to object
//     title: PropTypes.string, //example: pass in on App.js "<Header title={1}" and it'd error out since that is an integer, not a string. It makes your code safer and tests it better. Add .isRequired if wanted.
// }


export default Header
