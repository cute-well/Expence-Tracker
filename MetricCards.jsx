import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Layers, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function MetricCards({ stats, loading = false }) {
  const {
    totalIncome = 0,
    totalExpenses = 0,
    balance = 0,
    transactionCount = 0
  } = stats || {};

  const isBalancePositive = balance >= 0;

  const cards = [
    {
      id: 'balance',
      title: 'Total Balance',
      amount: balance,
      subtitle: isBalancePositive ? 'Net positive savings' : 'Expenses exceed income',
      icon: Wallet,
      gradient: isBalancePositive
        ? 'from-sky-500 to-indigo-600 text-white'
        : 'from-amber-500 to-rose-600 text-white',
      badgeBg: isBalancePositive ? 'bg-white/20 text-white' : 'bg-white/20 text-white',
      badgeText: isBalancePositive ? '+ In Green' : '- In Deficit',
      textColor: 'text-white',
      subColor: 'text-white/80',
      isHero: true
    },
    {
      id: 'income',
      title: 'Total Income',
      amount: totalIncome,
      subtitle: 'All credited inflows',
      icon: TrendingUp,
      gradient: 'bg-white text-slate-800 border border-slate-200/80',
      badgeBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      badgeIcon: ArrowUpRight,
      badgeText: 'Total Inflow',
      textColor: 'text-slate-900',
      subColor: 'text-slate-500',
      iconColor: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'expenses',
      title: 'Total Expenses',
      amount: totalExpenses,
      subtitle: 'All debited outflows',
      icon: TrendingDown,
      gradient: 'bg-white text-slate-800 border border-slate-200/80',
      badgeBg: 'bg-rose-50 text-rose-700 border border-rose-200',
      badgeIcon: ArrowDownRight,
      badgeText: 'Total Outflow',
      textColor: 'text-slate-900',
      subColor: 'text-slate-500',
      iconColor: 'text-rose-600 bg-rose-50'
    },
    {
      id: 'count',
      title: 'Transactions',
      amount: transactionCount,
      isCount: true,
      subtitle: 'Logged entries in DB',
      icon: Layers,
      gradient: 'bg-white text-slate-800 border border-slate-200/80',
      badgeBg: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      badgeText: 'Total Records',
      textColor: 'text-slate-900',
      subColor: 'text-slate-500',
      iconColor: 'text-indigo-600 bg-indigo-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const BadgeIcon = card.badgeIcon;

        return (
          <div
            key={card.id}
            className={`rounded-2xl p-5 shadow-sm transition-all duration-200 hover:shadow-md relative overflow-hidden ${
              card.isHero
                ? `bg-gradient-to-br ${card.gradient} shadow-sky-600/10`
                : card.gradient
            }`}
          >
            {/* Background subtle decoration for hero */}
            {card.isHero && (
              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
            )}

            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold uppercase tracking-wider ${card.subColor}`}>
                {card.title}
              </span>
              <div
                className={`p-2 rounded-xl flex items-center justify-center ${
                  card.isHero ? 'bg-white/15 text-white' : card.iconColor
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              {loading ? (
                <div className="h-8 w-28 bg-slate-200 animate-pulse rounded-lg mt-1" />
              ) : (
                <h3 className={`text-2xl font-extrabold tracking-tight ${card.textColor}`}>
                  {card.isCount ? card.amount.toLocaleString() : formatCurrency(card.amount)}
                </h3>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100/20">
              <span className={card.subColor}>{card.subtitle}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-0.5 ${card.badgeBg}`}
              >
                {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
                {card.badgeText}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

