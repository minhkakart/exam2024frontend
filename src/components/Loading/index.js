import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import className from 'classnames/bind'

import styles from './Loading.module.scss'

const cx = className.bind(styles)

function Loading() {
    return ( 
        <div className={cx('container')} >
            <FontAwesomeIcon className={cx('loader')} icon={faSpinner} size='lg'/>
        </div>
     );
}

export default Loading;