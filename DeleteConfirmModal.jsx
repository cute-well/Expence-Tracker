import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  transaction = null,
  deleting = false
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-scaleUp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 id="delete-dialog-title" className="text-base font-bold text-slate-900">
              Delete Transaction?
            </h3>
            <p className="text-xs text-slate-500">
              This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Transaction Summary Card */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl mb-5 space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Description:</span>
            <span className="font-semibold text-slate-800">{transaction.description}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Amount:</span>
            <span className="font-bold text-slate-900">{formatCurrency(transaction.amount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Date:</span>
            <span className="text-slate-700">{formatDate(transaction.date)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Category:</span>
            <span className="font-medium text-slate-700">{transaction.category}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/20 transition flex items-center space-x-1.5 disabled:opacity-50"
          >
            {deleting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

