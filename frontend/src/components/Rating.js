import React from 'react';



const Rating = ( { value, text, color }) => {
	return (
		<div className='Rating'>
			<span>
				<i style={{color}}
					className={ 
						value >= 1 ? 'fas fa-star' 
						: value>= 0.5 ? 'fas fa-star-half-alt'
						: 'fas fa-star' 
				}
				></i>
			</span>
			<span>
				<i style={{color}}
					className={ 
						value >= 2 ? 'fas fa-star' 
						: value>= 1.5 ? 'fas fa-star-half-alt'
						: 'fas fa-star' 
				}
				></i>
			</span>
			<span>
				<i style={{color}}
					className={ 
						value >= 3 ? 'fas fa-star' 
						: value>= 2.5 ? 'fas fa-star-half-alt'
						: 'fas fa-star' 
				}
				></i>
			</span>
			<span>
				<i style={{color}}
					className={ 
						value >= 4 ? 'fas fa-star' 
						: value>= 3.5 ? 'fas fa-star-half-alt'
						: 'fas fa-star' 
				}
				></i>
			</span>
			<span>
				<i style={{color}}
					className={ 
						value >= 5 ? 'fas fa-star' 
						: value>= 4.5 ? 'fas fa-star-half-alt'
						: 'fas fa-star' 
				}
				></i>
			</span>
		{/*when the second condition is null itcan be writtrn like below one*/}
			{/*<span>{text ? text : ''}</span>*/}
			<span>{text && text}</span>
		</div>
		)
}

// setting up default value of a this.props.
Rating.defaultProps = {
	color: '#f8e825'
}


export default Rating;