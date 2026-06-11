import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import client from '../api/client'
import { resources } from '../config/resources'
import { useToast } from '../lib/toast'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'
import Pagination from '../components/Pagination'
import { Plus, Inbox } from '../components/icons'

const PER_PAGE = 15

export default function ResourceList() {
  const { resource } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const cfg = resources[resource]

  const [rows, setRows] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [toDelete, setToDelete] = useState(null)

  // reset to first page when switching resource
  useEffect(() => {
    setPage(1)
  }, [resource])

  const load = useCallback(
    (p) => {
      if (!cfg) return
      setLoading(true)
      client
        .get(cfg.path, { params: { per_page: PER_PAGE, page: p } })
        .then((res) => {
          setRows(res.data?.data ?? res.data ?? [])
          setMeta(res.data?.meta ?? null)
        })
        .catch(() => toast.push('تعذّر تحميل البيانات', 'err'))
        .finally(() => setLoading(false))
    },
    [cfg, toast]
  )

  useEffect(() => {
    load(page)
  }, [load, page])

  if (!cfg) return <Navigate to="/" replace />

  const total = meta?.total ?? rows.length

  const confirmDelete = async () => {
    const id = toDelete.id
    setToDelete(null)
    try {
      await client.delete(`${cfg.path}/${id}`)
      toast.push('تم الحذف بنجاح')
      // if last item on a page beyond the first, step back
      if (rows.length === 1 && page > 1) setPage((p) => p - 1)
      else load(page)
    } catch (e) {
      toast.push('تعذّر الحذف', 'err')
    }
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h2>{cfg.title.ar}</h2>
          <div className="muted">{total} عنصر</div>
        </div>
        <button className="btn btn--primary" onClick={() => navigate(`/${resource}/new`)}>
          <Plus /> إضافة {cfg.singular.ar}
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : rows.length === 0 ? (
        <div className="card card--pad">
          <div className="empty">
            <Inbox style={{ width: 44, margin: '0 auto 0.7rem', color: 'var(--muted)' }} />
            لا يوجد {cfg.singular.ar} بعد. ابدأ بإضافة واحد.
          </div>
        </div>
      ) : (
        <>
          <DataTable
            columns={cfg.columns}
            rows={rows}
            onEdit={(row) => navigate(`/${resource}/${row.id}`)}
            onDelete={(row) => setToDelete(row)}
          />
          <Pagination meta={meta} onPage={setPage} />
        </>
      )}

      {toDelete && (
        <Modal
          title="تأكيد الحذف"
          message="هل أنت متأكد من حذف هذا العنصر؟ لا يمكن التراجع."
          confirmLabel="حذف"
          danger
          onConfirm={confirmDelete}
          onClose={() => setToDelete(null)}
        />
      )}
    </>
  )
}
