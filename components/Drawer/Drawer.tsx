import { ReactNode } from 'react'
import './Drawer.scss'

type Props = {
  button: ReactNode
  isBottom?: boolean
  children: ReactNode
}

const Drawer: React.FC<Props> = ({ button, children, isBottom }) => {
  return (
    <div className={`drawer ${isBottom && 'drawer-bottom'}`}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* <label htmlFor="my-drawer" className="drawer-button"> */}
        {button}
        {/* </label> */}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 text-base-content min-h-80 w-full p-4 bottom-0 fixed">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Drawer
