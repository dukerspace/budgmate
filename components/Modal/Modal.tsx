import React, { ReactNode } from 'react'

type Props = {
  title?: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  isFull?: boolean
}

const Modal: React.FC<Props> = ({ title, isOpen, onClose, children, isFull }) => {
  return (
    <>
      {isOpen && (
        <div>
          <dialog className={`modal ${isOpen && 'modal-open'}`}>
            <div
              className={`modal-box max-w-full w-full rounded-none ${
                isFull ? 'max-h-full h-full' : 'h-5/6 fixed bottom-0'
              }`}
            >
              <button
                onClick={() => onClose()}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">{title}</h3>
              <div className="grid">{children}</div>
            </div>
          </dialog>
        </div>
      )}
    </>
  )
}

export default Modal
