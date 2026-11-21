import { useState } from 'react';
import { Check, Copy, Download, FileCode2 } from 'lucide-react';
import { ANDROID_KOTLIN_FILES } from '../data/androidKotlinBundle';
import { UI_TEXT } from '../data/translations';
import { AppLanguage } from '../types/hejGoteborg';

interface AndroidCodeTabProps {
  language: AppLanguage;
}

export function AndroidCodeTab({ language }: AndroidCodeTabProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = ANDROID_KOTLIN_FILES[selectedIndex];
  const t = UI_TEXT[language].android;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadFile = () => {
    const blob = new Blob([activeFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.filename.split(' ')[0];
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-900">{t.title}</h2>
        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed max-w-3xl">
          {t.description}
        </p>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {ANDROID_KOTLIN_FILES.map((file, idx) => (
          <button
            key={file.filename}
            type="button"
            onClick={() => {
              setSelectedIndex(idx);
              setCopied(false);
            }}
            className={`min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              selectedIndex === idx
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>{file.filename}</span>
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50">
          <div className="min-w-0">
            <p className="font-mono text-xs font-medium text-blue-900 truncate">
              {activeFile.packagePath}
            </p>
            <p className="mt-0.5 text-xs text-slate-600">
              {activeFile.description[language]}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? t.copied : t.copy}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadFile}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-xl transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.download}</span>
            </button>
          </div>
        </div>

        <pre className="p-5 overflow-x-auto text-xs leading-relaxed font-mono bg-slate-950 text-slate-100 max-h-[540px]">
          <code>{activeFile.code}</code>
        </pre>
      </div>
    </div>
  );
}
