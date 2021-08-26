import React from 'react'
import {Helmet} from 'react-helmet'


const Meta = ({title, description, keywords}) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keyword' content={keywords} />
		</Helmet>
		)
}


Meta.defaultProps = {
	title : 'Welcom to Proshop | Home',
	description: 'We sell the best products',
	keywords: 'elextronics, buy electronics, cheaper'
}

export default Meta