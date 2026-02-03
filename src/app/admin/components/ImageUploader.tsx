'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './ImageUploader.module.css';

interface ImageRecord {
  id: number;
  url: string;
  filename: string;
}

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [images, setImages] = useState<ImageRecord[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok && data.url) {
        onChange(data.url);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  const openPicker = async () => {
    setShowPicker(true);
    setLoadingImages(true);
    try {
      const res = await fetch('/api/images');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } finally {
      setLoadingImages(false);
    }
  };

  const selectImage = (url: string) => {
    onChange(url);
    setShowPicker(false);
  };

  useEffect(() => {
    if (showPicker) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showPicker]);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.dropzone} ${dragOver ? styles.dragOver : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <div className={styles.preview}>
            <Image src={value} alt="プレビュー" width={200} height={200} className={styles.previewImage} />
            <span className={styles.changeText}>クリックで変更</span>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.uploadIcon}>+</span>
            <span className={styles.uploadText}>
              {uploading ? 'アップロード中...' : '画像をドラッグ＆ドロップ、またはクリック'}
            </span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className={styles.hidden}
      />
      <button
        type="button"
        className={styles.pickerButton}
        onClick={openPicker}
      >
        既存画像から選択
      </button>

      {showPicker && (
        <div className={styles.overlay} onClick={() => setShowPicker(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>画像を選択</h3>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setShowPicker(false)}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {loadingImages ? (
                <p className={styles.loadingText}>読み込み中...</p>
              ) : images.length === 0 ? (
                <p className={styles.loadingText}>画像がありません</p>
              ) : (
                <div className={styles.imageGrid}>
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className={`${styles.imageGridItem} ${img.url === value ? styles.imageGridItemSelected : ''}`}
                      onClick={() => selectImage(img.url)}
                    >
                      <Image
                        src={img.url}
                        alt={img.filename}
                        width={120}
                        height={120}
                        className={styles.gridImage}
                      />
                      <span className={styles.gridFilename}>{img.filename}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
