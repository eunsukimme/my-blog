import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import TitleImage from '../../pages/title_image.png'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet defaultTitle="Blog by Eunsu Kim">
          <meta property="og:image" content={TitleImage} />
        </Helmet>
        {children}
      </div>
    )
  }
}

export default Layout
