'use client';

import { useState, useEffect } from 'react';
import DashboardShell from '../components/DashboardShell';
import styles from './accounts.module.css';

interface Account {
  id: number;
  username: string;
  createdAt: string;
}

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [createError, setCreateError] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPassword, setEditPassword] = useState('');
  const [editError, setEditError] = useState('');

  useEffect(() => {
    fetch('/api/accounts')
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    setCreateError('');
    const res = await fetch('/api/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: newUsername, password: newPassword }),
    });
    if (res.ok) {
      const user = await res.json();
      setAccounts((prev) => [...prev, user]);
      setNewUsername('');
      setNewPassword('');
      setShowCreate(false);
    } else {
      const data = await res.json();
      setCreateError(data.error || '作成に失敗しました');
    }
  };

  const handlePasswordChange = async (id: number) => {
    setEditError('');
    const res = await fetch(`/api/accounts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: editPassword }),
    });
    if (res.ok) {
      setEditingId(null);
      setEditPassword('');
    } else {
      const data = await res.json();
      setEditError(data.error || '変更に失敗しました');
    }
  };

  const handleDelete = async (id: number, username: string) => {
    if (!confirm(`「${username}」を削除しますか？`)) return;
    const res = await fetch(`/api/accounts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setAccounts((prev) => prev.filter((a) => a.id !== id));
    } else {
      const data = await res.json();
      alert(data.error || '削除に失敗しました');
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ja-JP');
  };

  return (
    <DashboardShell>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>アカウント管理</h1>
          {!loading && (
            <p className={styles.count}>{accounts.length}件のアカウント</p>
          )}
        </div>
        <button
          className={styles.addBtn}
          onClick={() => {
            setShowCreate(!showCreate);
            setCreateError('');
          }}
        >
          + 新規作成
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>読み込み中...</div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>ユーザー名</span>
            <span>作成日</span>
            <span>操作</span>
          </div>

          {showCreate && (
            <>
              <div className={styles.formRow}>
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="ユーザー名"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <input
                  className={styles.formInput}
                  type="password"
                  placeholder="パスワード"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className={styles.formActions}>
                  <button className={styles.saveBtn} onClick={handleCreate}>
                    作成
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => {
                      setShowCreate(false);
                      setCreateError('');
                    }}
                  >
                    キャンセル
                  </button>
                </div>
              </div>
              {createError && (
                <div className={styles.error}>{createError}</div>
              )}
            </>
          )}

          {accounts.length === 0 ? (
            <div className={styles.empty}>
              <p>アカウントがありません</p>
            </div>
          ) : (
            accounts.map((account) => (
              <div key={account.id} className={styles.row}>
                <div className={styles.colUsername}>{account.username}</div>
                <div className={styles.colDate}>
                  {formatDate(account.createdAt)}
                </div>
                <div className={styles.colActions}>
                  {editingId === account.id ? (
                    <div className={styles.inlineForm}>
                      <input
                        className={styles.formInput}
                        type="password"
                        placeholder="新しいパスワード"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        style={{ width: 140 }}
                      />
                      <button
                        className={styles.saveBtn}
                        onClick={() => handlePasswordChange(account.id)}
                      >
                        保存
                      </button>
                      <button
                        className={styles.cancelBtn}
                        onClick={() => {
                          setEditingId(null);
                          setEditPassword('');
                          setEditError('');
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className={styles.editBtn}
                        onClick={() => {
                          setEditingId(account.id);
                          setEditPassword('');
                          setEditError('');
                        }}
                      >
                        パスワード変更
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() =>
                          handleDelete(account.id, account.username)
                        }
                      >
                        削除
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
          {editError && <div className={styles.error}>{editError}</div>}
        </div>
      )}
    </DashboardShell>
  );
}
