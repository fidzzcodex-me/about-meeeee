'use client';

import type { KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FileTreeItem, getFileTabId } from '@/components/file-tree/FileTreeItem';
import { SITE } from '@/lib/constants';
import type { FileEntry } from '@/types';

type FileTreeProps = {
  files: FileEntry[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function FileTree({ files, activeId, onSelect }: FileTreeProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = files.findIndex((file) => file.id === activeId);
    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % files.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + files.length) % files.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = files.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const next = files[nextIndex];
    if (!next) {
      return;
    }
    onSelect(next.id);
    requestAnimationFrame(() => {
      document.getElementById(getFileTabId(next.id))?.focus();
    });
  };

  return (
    <div>
      <p className="mb-2 px-3 font-mono text-[11px] uppercase tracking-widest text-text-muted">
        Explorer
      </p>
      <div className="mb-1 flex items-center gap-2 px-3 py-1.5 font-mono text-sm text-text-primary">
        <FontAwesomeIcon icon={faFolderOpen} className="text-accent-alt" fixedWidth />
        <span>~/{SITE.name}</span>
      </div>
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="File tentang saya"
        className="space-y-1 pl-3"
      >
        {files.map((file) => (
          <FileTreeItem
            key={file.id}
            file={file}
            active={file.id === activeId}
            onSelect={onSelect}
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
    </div>
  );
}
