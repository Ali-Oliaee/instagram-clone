import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './style.scss'

function Logo() {
  const { t } = useTranslation()
  return (
    <Link to="/">
      <div className="logo-container">
        <svg width="30" height="79" viewBox="0 0 30 79">
          <g
            transform="matrix(0.820746665743631,0,0,0.820746665743631,-26.382307075025324,-0.944178052199236)"
            fill="#ff5722"
          >
            <path
              d="M52.094,93.749c0.001,0,11.108-7.41,0.883-22.909c-4.773-7.235-12.596-14.971-11.701-22.63  c-1.015,0.883-1.937,1.859-2.38,2.453c-1.618,2.169-2.791,4.529-3.392,6.964c-0.697,2.823-0.515,5.795,1.102,8.686  c1.501,2.683,4.107,5.103,6.558,7.537c5.868,5.826,11.036,12.018,9.461,18.607C52.541,92.811,52.5,93.478,52.094,93.749z"
            />
            <path
              d="M59.398,79.14c0.001-0.001,17.835-11.897,1.417-36.782C53.152,30.742,40.592,18.321,42.03,6.024  c-1.365,1.194-3.11,2.985-3.821,3.939c-2.598,3.482-4.481,7.271-5.446,11.181c-1.12,4.533-0.827,9.304,1.77,13.946  c2.41,4.308,6.594,8.193,10.53,12.102c9.421,9.355,17.719,19.295,15.19,29.876C60.116,77.635,60.049,78.706,59.398,79.14z"
            />
          </g>
        </svg>
        <div className="logo-info">
          <h3>{t('instagram')}</h3>
          <h5>{t('vatani-edition')}</h5>
        </div>
      </div>
    </Link>
  )
}

export default Logo
