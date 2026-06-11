import React from 'react'
import { ml } from '../lib/ml'
import { Pencil, Trash } from './icons'

function Cell({ col, row }) {
  const val = row[col.key]
  switch (col.type) {
    case 'thumb':
      return val ? (
        <img className="cell-thumb" src={val} alt="" />
      ) : (
        <div className="cell-thumb cell-thumb--ph"><img src="/logo-mark-white.png" alt="" /></div>
      )
    case 'ml':
      return <span className="cell-title">{ml(val)}</span>
    case 'rel':
      return val ? <span className="badge badge--blue">{ml(val.title)}</span> : <span style={{ color: 'var(--muted)' }}>—</span>
    case 'bool':
      return val ? <span className="badge badge--green">منشور</span> : <span className="badge badge--gray">مخفي</span>
    default:
      return <span>{val ?? '—'}</span>
  }
}

export default function DataTable({ columns, rows, onEdit, onDelete }) {
  return (
    <div className="card table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label || ''}</th>
            ))}
            <th style={{ textAlign: 'end' }}>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => (
                <td key={c.key}><Cell col={c} row={row} /></td>
              ))}
              <td>
                <div className="row-actions">
                  <button className="btn btn--ghost btn--sm" onClick={() => onEdit(row)}><Pencil /> تعديل</button>
                  <button className="btn btn--danger btn--sm" onClick={() => onDelete(row)}><Trash /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
