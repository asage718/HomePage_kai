'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import DashboardShell from '../components/DashboardShell';
import styles from './contacts.module.css';

type Status = 'unread' | 'in_progress' | 'done';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: Status;
  createdAt: string;
}

const STATUS_LABELS: Record<Status, string> = {
  unread: '未対応',
  in_progress: '対応中',
  done: '完了',
};

const FILTER_TABS: { value: string; label: string }[] = [
  { value: '', label: '全て' },
  { value: 'unread', label: '未対応' },
  { value: 'in_progress', label: '対応中' },
  { value: 'done', label: '完了' },
];

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchContacts = useCallback(async (q: string, status: string) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (status) params.set('status', status);
    const url = `/api/contacts${params.toString() ? `?${params}` : ''}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setContacts(data);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    fetchContacts('', '').finally(() => setLoading(false));
  }, [fetchContacts]);

  useEffect(() => {
    if (loading) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchContacts(searchQuery, statusFilter);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery, statusFilter, fetchContacts, loading]);

  const updateStatus = async (id: number, status: Status) => {
    const res = await fetch('/api/contacts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const updated: Contact = await res.json();
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      );
      if (selected?.id === id) {
        setSelected(updated);
      }
    }
  };

  const handleSelect = async (contact: Contact) => {
    setSelected(contact);
    if (contact.status === 'unread') {
      await updateStatus(contact.id, 'in_progress');
    }
  };

  const handleStatusChange = async (status: Status) => {
    if (!selected) return;
    await updateStatus(selected.id, status);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  };

  const unreadCount = contacts.filter((c) => c.status === 'unread').length;

  return (
    <DashboardShell>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>お問い合わせ</h1>
          {!loading && (
            <p className={styles.count}>
              {contacts.length}件{unreadCount > 0 && `（未対応 ${unreadCount}件）`}
            </p>
          )}
        </div>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="名前・メール・依頼内容・メッセージで検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.filterTabs}>
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            className={`${styles.filterTab} ${statusFilter === tab.value ? styles.filterTabActive : ''}`}
            onClick={() => setStatusFilter(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loading}>読み込み中...</div>
      ) : contacts.length === 0 ? (
        <div className={styles.empty}>
          <p>お問い合わせはありません</p>
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span className={styles.colStatus}>状態</span>
            <span className={styles.colName}>名前</span>
            <span className={styles.colSubject}>依頼内容</span>
            <span className={styles.colDate}>日付</span>
          </div>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`${styles.row} ${contact.status === 'unread' ? styles.rowUnread : ''}`}
              onClick={() => handleSelect(contact)}
            >
              <div className={styles.colStatus}>
                <span className={`${styles.statusBadge} ${styles[`status_${contact.status}`]}`}>
                  {STATUS_LABELS[contact.status]}
                </span>
              </div>
              <div className={styles.colName}>
                <span className={styles.nameText}>{contact.name}</span>
                <span className={styles.subjectText}>{contact.subject}</span>
              </div>
              <div className={styles.colSubject}>{contact.subject}</div>
              <div className={styles.colDate}>{formatDate(contact.createdAt)}</div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div className={styles.detail} onClick={(e) => e.stopPropagation()}>
            <div className={styles.detailHeader}>
              <h2 className={styles.detailTitle}>お問い合わせ詳細</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setSelected(null)}
              >
                &times;
              </button>
            </div>
            <div className={styles.detailBody}>
              <div className={styles.detailField}>
                <div className={styles.detailLabel}>ステータス</div>
                <select
                  className={styles.statusSelect}
                  value={selected.status}
                  onChange={(e) => handleStatusChange(e.target.value as Status)}
                >
                  <option value="unread">未対応</option>
                  <option value="in_progress">対応中</option>
                  <option value="done">完了</option>
                </select>
              </div>
              <div className={styles.detailField}>
                <div className={styles.detailLabel}>お名前</div>
                <div className={styles.detailValue}>{selected.name}</div>
              </div>
              <div className={styles.detailField}>
                <div className={styles.detailLabel}>メールアドレス</div>
                <div className={styles.detailValue}>{selected.email}</div>
              </div>
              <div className={styles.detailField}>
                <div className={styles.detailLabel}>依頼内容</div>
                <div className={styles.detailValue}>{selected.subject}</div>
              </div>
              <div className={styles.detailField}>
                <div className={styles.detailLabel}>メッセージ</div>
                <div className={styles.detailValue}>{selected.message}</div>
              </div>
              <div className={styles.detailField}>
                <div className={styles.detailLabel}>受信日時</div>
                <div className={styles.detailValue}>
                  {new Date(selected.createdAt).toLocaleString('ja-JP')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
