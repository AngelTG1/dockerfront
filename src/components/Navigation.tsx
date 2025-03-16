import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <>
        <nav>
            <ul>
                <li>
                    <Link to="/home">Casa</Link>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default Navigation