import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addArticle } from './articleActions'

export const NewArticle = ({addtext, user}) => {
	let _text
	const _add = () => {
		addtext({
			text: _text ? _text.value : "", 
			date: new Date(), 
			img: "", 
			comments: [], 
			author: user.displayName
		})
	}
	//render text area test
	
	return (
		<div className="container">
	    	<div className="row">
		    	<div className="status-update">
		    		<div className= "container-text-area">
		    			<form>
						<textarea className="text-area" placeholder="What are you doing right now?"  ref={(node) => _text = node} ></textarea>
						<div className="uploadContainer">
							<input className="uploadinline" type="file"></input>
							<button type="reset" className="resettext"> reset </button>
						</div>
						</form>
						<button className="text-submit" onClick={_add} ><i className="glyphicon glyphicon-pencil"></i> Submit</button>
					</div>
				</div>
		    </div>
		</div>
	)
}


NewArticle.propTypes = {
    user: PropTypes.object.isRequired,
    addtext: PropTypes.func.isRequired
}

export default connect (
	(state) => ({user: state.userinfo}),
	(dispatch) => ({
		addtext: (text) => dispatch(addArticle(text))
	})
)(NewArticle)
