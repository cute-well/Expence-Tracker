import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import TransactionModal from './components/TransactionModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import CompassGuideModal from './components/CompassGuideModal';
import Toast from './components/Toast';
import api from './services/api';

const initialFilters = {
  search: '',
  type: 'All',
  category: 'All',
  paymentMethod: 'All',
  startDate: '',
  endDate: '',
  sortBy: 'date',
  order: 'desc'
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [compassGuideOpen, setCompassGuideOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Load all transactions and statistics
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [txRes, statsRes] = await Promise.all([
        api.getTransactions(),
        api.getTransactionStats()
      ]);

      if (txRes.success) setTransactions(txRes.data);
      if (statsRes.success) setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
      setToast({
        type: 'error',
        title: 'Connection Notice',
        message: 'Could not connect to backend API. Please make sure the server is running on port 5000.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Open modal for Adding
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setModalData(null);
    setIsModalOpen(true);
  };

  // Open modal for Editing
  const handleOpenEditModal = (tx) => {
    setIsEditing(true);
    setModalData(tx);
    setIsModalOpen(true);
  };

  // Submit Add or Edit
  const handleSubmitTransaction = async (formData) => {
    if (isEditing && modalData?._id) {
      const res = await api.updateTransaction(modalData._id, formData);
      if (res.success) {
        setToast({
          type: 'success',
          title: 'Transaction Updated',
          message: `"${formData.description}" was successfully updated in MongoDB.`
        });
        await loadData();
      }
    } else {
      const res = await api.createTransaction(formData);
      if (res.success) {
        setToast({
          type: 'success',
          title: 'Transaction Added',
          message: `"${formData.description}" was saved to MongoDB collection "transactions".`
        });
        await loadData();
      }
    }
  };

  // Open Delete Confirmation
  const handleOpenDeleteConfirm = (tx) => {
    setTransactionToDelete(tx);
    setDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!transactionToDelete?._id) return;
    try {
      setDeleting(true);
      const res = await api.deleteTransaction(transactionToDelete._id);
      if (res.success) {
        setToast({
          type: 'success',
          title: 'Transaction Deleted',
          message: `Transaction was permanently removed from MongoDB.`
        });
        setDeleteModalOpen(false);
        setTransactionToDelete(null);
        await loadData();
      }
    } catch (error) {
      setToast({
        type: 'error',
        title: 'Delete Failed',
        message: error.message || 'Could not delete transaction.'
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={handleOpenAddModal}
        onOpenCompassGuide={() => setCompassGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            stats={stats}
            loading={loading}
            onNavigateTransactions={() => setActiveTab('transactions')}
            onOpenAddModal={handleOpenAddModal}
            onOpenCompassGuide={() => setCompassGuideOpen(true)}
            onEditTransaction={handleOpenEditModal}
            onDeleteTransaction={handleOpenDeleteConfirm}
          />
        )}

        {activeTab === 'transactions' && (
          <Transactions
            transactions={transactions}
            loading={loading}
            onOpenAddModal={handleOpenAddModal}
            onEditTransaction={handleOpenEditModal}
            onDeleteTransaction={handleOpenDeleteConfirm}
            filters={filters}
            setFilters={setFilters}
            onResetFilters={handleResetFilters}
          />
        )}

        {activeTab === 'analytics' && (
          <Analytics stats={stats} loading={loading} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} ExpenseTracker. Connected to MongoDB Compass on 127.0.0.1:27017.</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCompassGuideOpen(true)}
              className="text-sky-600 hover:text-sky-800 font-semibold"
            >
              MongoDB Compass Help
            </button>
            <span>•</span>
            <span className="text-emerald-600 font-medium">● Local Database Active</span>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitTransaction}
        initialData={modalData}
        isEditing={isEditing}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setTransactionToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        transaction={transactionToDelete}
        deleting={deleting}
      />

      <CompassGuideModal
        isOpen={compassGuideOpen}
        onClose={() => setCompassGuideOpen(false)}
      />

      {/* Toast Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

