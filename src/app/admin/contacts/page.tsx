'use client';

import { useState, useEffect } from 'react';
import DashboardShell from '../components/DashboardShell';
import styles from './contacts.module.css';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  useEffect(() => {
    fetch('/api/contacts')
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = async (contact: Contact) => {
    setSelected(contact);

    if (!contact.read) {
      const res = await fetch('/api/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: contact.id, read: true }),
      });

      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c.id === contact.id ? { ...c, read: true } : c))
        );
      }
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  };

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <DashboardShell>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>お問い合わせ</h1>
          {!loading && (
            <p className={styles.count}>
              {contacts.length}件{unreadCount > 0 && `（未読 ${unreadCount}件）`}
            </p>
          )}
        </div>
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
              className={`${styles.row} ${!contact.read ? styles.rowUnread : ''}`}
              onClick={() => handleSelect(contact)}
            >
              <div className={styles.colStatus}>
                {!contact.read && <span className={styles.unreadDot} />}
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
