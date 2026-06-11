import React from 'react'

export default function Modal({ title, message, confirmLabel = 'تأكيد', cancelLabel = 'إلغاء', onConfirm, onClose, danger }) {
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {message && <p>{message}</p>}
        <div className="modal-actions">
          <button className="btn btn--ghost" onClick={onClose}>{cancelLabel}</button>
          <button className={`btn ${danger ? 'btn--danger' : 'btn--primary'}`} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
