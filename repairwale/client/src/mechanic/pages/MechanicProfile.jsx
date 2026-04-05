import React, { useState, useEffect } from 'react'
import { useAuth } from '../../shared/context/AuthContext'
import { getMechanic, saveMechanic } from '../../shared/services/roleData'
import { mechanicProfileDefaults as demoMechanicDefaults } from '../data/mechanicDemoData'

const styles = `
.profile-wrapper {
  min-height: 100vh;
  background: linear-gradient(180deg, #0B1F3B 0%, #0B1F3B 100%);
  padding: 0;
}

/* ===== HERO HEADER ===== */
.profile-hero {
  background: linear-gradient(140deg, #0B1F3B 0%, #0B1F3B 46%, #0B1F3B 100%);
  padding: 60px 20px 100px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(0,0,0,0.45);
  border-bottom: 1px solid rgba(29,99,255,0.14);
}

.profile-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: 10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(29,99,255,0.24) 0%, transparent 72%);
  filter: blur(18px);
  animation: profile-float 20s ease-in-out infinite;
}

.profile-hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.profile-top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 1px solid #0B1F3B;
  color: #FFFFFF;
  padding: 12px 22px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-size: 14px;
  box-shadow: 0 4px 20px rgba(29,99,255,0.1);
}

.back-btn:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border-color: transparent;
  color: #0B1F3B;
  transform: translateX(-4px);
  box-shadow: 0 0 12px rgba(29,99,255,0.14);
}

.profile-actions {
  display: flex;
  gap: 10px;
}

.action-icon-btn {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 1px solid #0B1F3B;
  color: #0B1F3B;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(29,99,255,0.1);
}

.action-icon-btn:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border-color: transparent;
  color: #0B1F3B;
  transform: scale(1.12);
  box-shadow: 0 0 12px rgba(29,99,255,0.14);
}

.profile-header-main {
  display: flex;
  align-items: center;
  gap: 28px;
}

.profile-avatar-wrapper {
  position: relative;
}

.profile-avatar-large {
  width: 120px;
  height: 120px;
  border-radius: 24px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 800;
  color: #0B1F3B;
  border: 3px solid rgba(29,99,255,0.5);
  box-shadow: 0 0 18px rgba(29,99,255,0.14), 0 12px 40px rgba(0,0,0,0.3);
}

.profile-status-badge {
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  border: 3px solid #0B1F3B;
  box-shadow: 0 0 15px rgba(255,206,50,0.4);
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-name {
  font-size: 36px;
  font-weight: 900;
  color: #FFFFFF;
  margin: 0 0 8px 0;
  letter-spacing: -1px;
  text-shadow: 0 2px 8px rgba(29,99,255,0.12);
}

.profile-email {
  font-size: 16px;
  color: #FFFFFF;
  margin: 0 0 12px 0;
  overflow-wrap: anywhere;
}

.profile-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.profile-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 2px solid #0B1F3B;
  color: #0B1F3B;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(29,99,255,0.18);
}

.profile-badge--verified {
  background: linear-gradient(135deg, rgba(59,130,246,0.16) 0%, rgba(29,99,255,0.24) 100%);
  color: #EFF6FF;
  border-color: rgba(147,197,253,0.42);
}

.profile-badge--member {
  background: rgba(255,255,255,0.06);
  color: #F8FAFC;
  border-color: rgba(255,255,255,0.14);
}

.profile-member-since {
  font-size: 14px;
  color: rgba(255,206,50,0.7);
  font-weight: 500;
  margin: 0;
}

/* ===== STATS CARDS ===== */
.profile-stats-container {
  max-width: 1200px;
  margin: -60px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.profile-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background: transparent;
  border-radius: 0;
  padding: 24px;
  text-align: center;
  box-shadow: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.stat-card:hover {
  transform: none;
  box-shadow: none;
  border-color: rgba(148, 163, 184, 0.28);
}

.stat-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 900;
  color: #0B1F3B;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #aaa;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* ===== CONTENT SECTION ===== */
.profile-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

/* ===== TABS ===== */
.profile-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  background: transparent;
  padding: 12px;
  border-radius: 0;
  border: 0;
  overflow-x: auto;
  box-shadow: none;
}

.profile-tab {
  flex: 1;
  min-width: fit-content;
  padding: 14px 20px;
  background: transparent;
  border: 2px solid transparent;
  color: #aaa;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.profile-tab.active {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  color: #0B1F3B;
  border-color: #0B1F3B;
  box-shadow: 0 0 12px rgba(29,99,255,0.18), 0 6px 20px rgba(29,99,255,0.22);
}

.profile-tab:hover:not(.active) {
  background: #0B1F3B;
  color: #FFFFFF;
  border-color: #0B1F3B;
  box-shadow: 0 4px 12px rgba(29,99,255,0.1);
}

/* ===== CARDS ===== */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.info-card {
  background: transparent;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 0;
  padding: 28px;
  box-shadow: none;
  transition: all 0.3s ease;
}

.info-card:hover {
  border-color: rgba(148, 163, 184, 0.28);
  box-shadow: none;
  transform: none;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #0B1F3B;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 800;
  color: #FFFFFF;
}

.card-title-icon {
  font-size: 24px;
}

.card-edit-btn {
  padding: 10px 18px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 2px solid #0B1F3B;
  color: #0B1F3B;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
}

.card-edit-btn:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border-color: #0B1F3B;
  color: #0B1F3B;
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(29,99,255,0.18), 0 6px 16px rgba(29,99,255,0.12);
}

.info-rows {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #0B1F3B;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 13px;
  color: #aaa;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 15px;
  color: #FFFFFF;
  font-weight: 600;
  text-align: right;
}

.info-value.highlight {
  color: #0B1F3B;
  font-weight: 800;
}

/* ===== LISTS ===== */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item-card {
  display: flex;
  flex-direction: column;
  background: transparent;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 0;
  padding: 16px;
  transition: all 0.3s ease;
  box-shadow: none;
}

.item-card:hover {
  border-color: rgba(148, 163, 184, 0.28);
  box-shadow: none;
  transform: none;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.item-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: #FFFFFF;
}

.item-badge {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  color: #0B1F3B;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
}

.item-actions {
  display: flex;
  gap: 8px;
}

.item-action-btn {
  padding: 8px 14px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 1px solid #0B1F3B;
  color: #0B1F3B;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.item-action-btn:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border-color: #0B1F3B;
  color: #0B1F3B;
  transform: translateY(-1px);
  box-shadow: 0 0 12px rgba(29,99,255,0.18), 0 4px 12px rgba(29,99,255,0.18);
}

.item-action-btn.danger {
  color: #FFFFFF;
  border-color: #FFFFFF;
}

.item-action-btn.danger:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border-color: #FFFFFF;
  color: white;
}

.item-details {
  font-size: 13px;
  color: #aaa;
  line-height: 1.5;
}

.add-item-btn {
  margin-top: 16px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 2px solid #0B1F3B;
  color: #ffffff;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 12px rgba(29,99,255,0.18), 0 6px 20px rgba(29,99,255,0.18);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-item-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 12px rgba(29,99,255,0.18), 0 12px 32px rgba(29,99,255,0.28);
}

/* ===== EMPTY STATE ===== */
.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 16px;
  color: #FFFFFF;
  font-weight: 700;
  margin-bottom: 8px;
}

.empty-subtext {
  font-size: 13px;
  color: #aaa;
}

/* ===== MODALS ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 2px solid #0B1F3B;
  border-radius: 16px;
  padding: 28px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #0B1F3B;
}

.modal-title {
  font-size: 20px;
  font-weight: 800;
  color: #FFFFFF;
}

.modal-close {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 2px solid #FFFFFF;
  color: #FFFFFF;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border-color: #FFFFFF;
  color: white;
}

/* ===== FORMS ===== */
.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #aaa;
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 2px solid #0B1F3B;
  color: #FFFFFF;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #0B1F3B;
  box-shadow: 0 0 12px rgba(29,99,255,0.18), 0 0 0 3px rgba(29,99,255,0.12);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn-cancel {
  flex: 1;
  padding: 14px 20px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 2px solid #0B1F3B;
  color: #0B1F3B;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel:hover {
  background: #0B1F3B;
  border-color: #0B1F3B;
  box-shadow: 0 4px 12px rgba(29,99,255,0.1);
}

.btn-save {
  flex: 1;
  padding: 14px 20px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 2px solid #0B1F3B;
  color: #ffffff;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 12px rgba(29,99,255,0.18), 0 6px 20px rgba(29,99,255,0.18);
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(29,99,255,0.18), 0 10px 28px rgba(29,99,255,0.1);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .profile-hero {
    padding: 40px 20px 80px;
  }

  .profile-header-main {
    flex-direction: column;
    text-align: center;
  }

  .profile-name {
    font-size: 28px;
  }

  .profile-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .profile-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
  }
}

@media (max-width: 480px) {
  .profile-avatar-large {
    width: 100px;
    height: 100px;
    font-size: 40px;
  }

  .profile-name {
    font-size: 24px;
  }

  .stat-value {
    font-size: 28px;
  }
}

/* ===== PREMIUM THEME WITH HIGHLIGHTS ===== */
.profile-wrapper {
  background: linear-gradient(180deg, #0B1F3B 0%, #0B1F3B 100%) !important;
}

.profile-hero {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35), 0 0 100px rgba(29,99,255,0.05) !important;
  border-bottom: 1px solid rgba(29,99,255,0.1);
}

.profile-name,
.card-title,
.modal-title {
  color: #FFFFFF !important;
  text-shadow: 0 2px 8px rgba(29,99,255,0.1);
}

.stat-value {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 8px rgba(29,99,255,0.18));
}

.info-value {
  color: #FFFFFF !important;
}

.profile-email,
.profile-member-since,
.stat-label,
.info-label,
.form-label {
  color: rgba(255,255,255,0.7) !important;
}

.profile-badge {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
  color: #0B1F3B !important;
  box-shadow: 0 4px 12px rgba(29,99,255,0.1), inset 0 1px 2px rgba(255,255,255,0.1);
}

.back-btn {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border-color: #0B1F3B !important;
  color: #FFFFFF !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.back-btn:hover {
  border-color: #0B1F3B !important;
  box-shadow: 0 8px 20px rgba(29,99,255,0.18);
}

.action-icon-btn {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border-color: #0B1F3B !important;
  color: #FFFFFF !important;
  transition: all 0.3s ease;
}

.action-icon-btn:hover {
  border-color: #0B1F3B !important;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  box-shadow: 0 8px 24px rgba(29,99,255,0.12);
}

.stat-card {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #0B1F3B, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-card:hover {
  border-color: #0B1F3B !important;
  box-shadow: 0 16px 48px rgba(29,99,255,0.1);
}

.profile-tabs {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border-color: #0B1F3B !important;
  box-shadow: 0 6px 20px rgba(0,0,0,0.35);
}

.profile-tab {
  background: rgba(29,99,255,0.5) !important;
  border-color: #0B1F3B !important;
  color: rgba(255,255,255,0.7) !important;
  transition: all 0.3s ease;
}

.profile-tab:hover:not(.active) {
  border-color: #0B1F3B !important;
  color: #FFFFFF !important;
  background: rgba(29,99,255,0.5) !important;
}

.profile-tab.active {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border-color: #0B1F3B !important;
  color: #0B1F3B !important;
  box-shadow: 0 6px 20px rgba(29,99,255,0.18), inset 0 1px 2px rgba(255,255,255,0.1);
}

.info-card {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
  box-shadow: 0 8px 28px rgba(0,0,0,0.4);
  position: relative;
}

.info-card::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #0B1F3B, #0B1F3B);
  border-radius: 16px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.info-card:hover::after {
  opacity: 0.15;
}

.info-card:hover {
  box-shadow: 0 12px 40px rgba(29,99,255,0.12);
}

.service-item {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
}

.service-item:hover {
  border-color: #0B1F3B !important;
  box-shadow: 0 4px 16px rgba(29,99,255,0.12);
}

.service-name {
  color: #FFFFFF !important;
}

.service-rate {
  color: #0B1F3B !important;
  font-weight: 800;
}

.modal-content {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
  box-shadow: 0 24px 64px rgba(29,99,255,0.1);
}

.form-input {
  background: rgba(29,99,255,0.8) !important;
  border: 2px solid #0B1F3B !important;
  color: #FFFFFF !important;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: #0B1F3B !important;
  background: rgba(29,99,255,0.5) !important;
  box-shadow: 0 0 0 4px rgba(29,99,255,0.1);
}

.btn-cancel {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #FFFFFF !important;
  border: 2px solid #0B1F3B !important;
}

.btn-cancel:hover {
  border-color: #0B1F3B !important;
  box-shadow: 0 6px 16px rgba(29,99,255,0.12);
}

.btn-save,
.add-service-btn {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #FFFFFF !important;
  border: 2px solid #0B1F3B !important;
  box-shadow: 0 6px 20px rgba(29,99,255,0.22);
  font-weight: 800;
}

.btn-save:hover,
.add-service-btn:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  box-shadow: 0 12px 32px rgba(29,99,255,0.28);
  transform: translateY(-4px);
}

.service-actions .btn,
.edit-pricing-btn {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
  color: #0B1F3B !important;
  transition: all 0.2s;
}

.service-actions .btn:hover,
.edit-pricing-btn:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #FFFFFF !important;
  box-shadow: 0 6px 20px rgba(29,99,255,0.22);
  transform: translateY(-2px);
}

.service-actions .btn.danger {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #FFFFFF !important;
  border-color: #FFFFFF !important;
}

.service-actions .btn.danger:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #FFFFFF !important;
  box-shadow: 0 6px 20px rgba(255,206,50,0.4);
}

.modal-close {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
  color: #FFFFFF !important;
}

.modal-close:hover {
  border-color: #FFFFFF !important;
  color: #FFFFFF !important;
  box-shadow: 0 6px 16px rgba(255,206,50,0.3);
}

.profile-status-badge {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #FFFFFF !important;
  border: 3px solid #0B1F3B !important;
  box-shadow: 0 4px 12px rgba(255,206,50,0.4);
  font-weight: 800;
}

.profile-avatar-large {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 4px solid #0B1F3B !important;
  box-shadow: 0 12px 40px rgba(29,99,255,0.12);
}

.card-header {
  border-bottom-color: rgba(29,99,255,0.12) !important;
}

.modal-header {
  border-bottom: 2px solid rgba(29,99,255,0.12) !important;
}

.info-row {
  border-bottom-color: rgba(29,99,255,0.3) !important;
}

.modal-overlay {
  background: rgba(29,99,255,0.85) !important;
  backdrop-filter: blur(8px);
}

/* ===== FLAT PROFILE CLEANUP ===== */
.profile-wrapper {
  background: #0b1220 !important;
}

.profile-hero,
.profile-stats-container,
.profile-tabs,
.info-card,
.stat-card,
.modal-content,
.item-card,
.form-input,
.btn-save,
.btn-cancel,
.card-edit-btn,
.back-btn,
.action-icon-btn,
.profile-avatar-large,
.profile-status-badge,
.profile-badge,
.profile-tab,
.profile-tab.active,
.item-badge,
.item-action-btn,
.modal-close {
  background: #0f172a !important;
  background-image: none !important;
  border-color: #233248 !important;
  box-shadow: none !important;
  text-shadow: none !important;
  filter: none !important;
  border-radius: 22px !important;
}

.profile-hero::before,
.info-card::after,
.stat-card::before {
  display: none !important;
  content: none !important;
}

.profile-tab:hover,
.profile-tab.active,
.item-card:hover,
.info-card:hover,
.stat-card:hover,
.back-btn:hover,
.card-edit-btn:hover,
.btn-save:hover,
.btn-cancel:hover,
.item-action-btn:hover,
.action-icon-btn:hover,
.modal-close:hover {
  transform: none !important;
  box-shadow: none !important;
}

.profile-badges {
  gap: 14px;
}

.profile-badge,
.item-badge,
.profile-status-badge {
  padding: 0 !important;
  border: 0 !important;
  border-radius: 9999px !important;
  color: #cbd5e1 !important;
  font-size: 13px;
  font-weight: 600;
}

.profile-status-badge {
  position: static !important;
  margin-top: 8px;
}

.profile-tabs {
  background: transparent !important;
  border: 0 !important;
  padding: 0 !important;
  box-shadow: none !important;
  margin-bottom: 22px;
}

.profile-tab,
.profile-tab.active,
.profile-tab:hover {
  border: 0 !important;
  background: transparent !important;
  color: #cbd5e1 !important;
  padding: 8px 0 !important;
  justify-content: flex-start;
  margin-right: 14px;
  border-bottom: 1px solid transparent !important;
  border-radius: 9999px !important;
}

.profile-tab.active {
  color: #ffffff !important;
  border-bottom-color: #64748b !important;
}

.items-list {
  gap: 0 !important;
}

.item-card {
  border: 0 !important;
  border-bottom: 1px solid #233248 !important;
  border-radius: 18px !important;
  padding: 14px 0 !important;
  background: transparent !important;
}

.item-card:last-child {
  border-bottom: 0 !important;
}

.item-header {
  margin-bottom: 6px;
}

.item-badge,
.item-action-btn,
.add-item-btn,
.card-edit-btn,
.btn-save,
.btn-cancel,
.modal-close,
.back-btn,
.action-icon-btn {
  border-radius: 18px !important;
}

.profile-header-main {
  align-items: flex-start;
}

.profile-stats-grid,
.cards-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
}

.profile-stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.stat-card,
.info-card {
  height: 100%;
}

.info-rows {
  gap: 10px;
}

.info-row,
.card-header,
.modal-header {
  border-color: #233248 !important;
}

.modal-overlay {
  background: rgba(2, 8, 23, 0.8) !important;
  backdrop-filter: none !important;
}

.profile-header-main,
.profile-stats-grid,
.cards-grid,
.info-card,
.stat-card,
.profile-tabs,
.item-card,
.modal-content {
  border-radius: 24px !important;
}

.profile-tabs {
  border-radius: 9999px !important;
  padding: 10px !important;
}

.profile-tab {
  border-radius: 9999px !important;
  padding: 12px 18px !important;
}

.profile-tab.active {
  border-radius: 9999px !important;
}

.info-card,
.stat-card,
.item-card,
.modal-content {
  border-radius: 24px !important;
}

.info-card {
  overflow: hidden;
}

.profile-section-shell {
  display: grid;
  gap: 16px;
}

.profile-section-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.profile-section-card {
  background: transparent;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 24px;
  padding: 28px;
  box-shadow: none;
}

.profile-section-card--overview {
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.96));
}

.profile-section-card--services {
  background: linear-gradient(180deg, rgba(248,250,252,0.98), rgba(255,255,255,0.96));
}

.profile-section-card--availability {
  background: linear-gradient(180deg, rgba(247,250,252,0.98), rgba(255,255,255,0.96));
}

.profile-section-card--reviews {
  background: linear-gradient(180deg, rgba(250,250,250,0.98), rgba(255,255,255,0.96));
}

.profile-section-card--earnings {
  background: linear-gradient(180deg, rgba(248,250,252,0.98), rgba(255,255,255,0.96));
}

.profile-summary-line {
  margin-top: 8px;
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
}

.stat-detail {
  margin-top: 8px;
  color: #64748b;
  font-size: 12px;
  line-height: 1.4;
}

.stat-pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  justify-content: center;
}

.stat-pill {
  padding: 6px 10px;
  border-radius: 9999px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #334155;
  font-size: 11px;
  font-weight: 600;
}

.profile-section-card.full {
  grid-column: 1 / -1;
}

.profile-section-grid .info-card,
.profile-section-grid .stat-card,
.profile-section-grid .item-card {
  height: 100%;
}

.card-header,
.modal-header {
  padding-top: 4px;
}

@media (max-width: 900px) {
  .profile-stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .profile-stats-grid,
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

@keyframes profile-float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(10px, 10px); }
  50% { transform: translate(0, 20px); }
  75% { transform: translate(-10px, 10px); }
}

/* ===== SMALL BOX TABS (OVERVIEW / SERVICES / AVAILABILITY) ===== */
.profile-tabs {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 10px !important;
  padding: 0 !important;
  background: transparent !important;
  border: 0 !important;
}

.profile-tab,
.profile-tab.active,
.profile-tab:hover:not(.active) {
  flex: 0 0 auto !important;
  min-width: 120px !important;
  justify-content: center !important;
  padding: 10px 14px !important;
  border-radius: 10px !important;
  border: 1px solid #d1d5db !important;
  background: #ffffff !important;
  color: #374151 !important;
  box-shadow: none !important;
}

.profile-tab.active {
  border-color: #9ca3af !important;
  background: #f3f4f6 !important;
  color: #111827 !important;
}

.profile-tab:hover:not(.active) {
  border-color: #9ca3af !important;
  background: #f9fafb !important;
}

@media (max-width: 640px) {
  .profile-tab,
  .profile-tab.active,
  .profile-tab:hover:not(.active) {
    min-width: 100px !important;
    padding: 9px 12px !important;
    font-size: 13px !important;
  }
}

/* ===== PLAIN PROFILE OVERRIDES ===== */
.profile-wrapper {
  background: #f8fafc !important;
  color: #111827 !important;
}

.profile-hero,
.profile-stats-container,
.profile-content,
.profile-tabs,
.profile-section-card,
.info-card,
.stat-card,
.item-card,
.modal-content {
  background: #ffffff !important;
  background-image: none !important;
  box-shadow: none !important;
  filter: none !important;
  text-shadow: none !important;
}

.profile-hero,
.profile-section-card,
.info-card,
.stat-card,
.item-card,
.modal-content,
.profile-tabs {
  border: 1px solid #e5e7eb !important;
  border-radius: 16px !important;
}

.profile-hero {
  border-bottom: 1px solid #e5e7eb !important;
}

.profile-hero::before,
.profile-hero::after,
.info-card::before,
.info-card::after,
.stat-card::before,
.stat-card::after {
  display: none !important;
  content: none !important;
}

.profile-name,
.card-title,
.modal-title,
.stat-value,
.info-value,
.item-title,
.item-details,
.profile-email,
.profile-member-since,
.stat-label,
.info-label,
.form-label,
.profile-section-note,
.profile-section-name {
  color: #111827 !important;
  text-shadow: none !important;
}

.back-btn,
.action-icon-btn,
.card-edit-btn,
.add-item-btn,
.btn-save,
.btn-cancel,
.item-action-btn,
.modal-close,
.profile-badge,
.profile-status-badge,
.item-badge {
  background: #f9fafb !important;
  color: #111827 !important;
  border: 1px solid #d1d5db !important;
  box-shadow: none !important;
  border-radius: 12px !important;
}

.profile-avatar-large {
  background: #ffffff !important;
  color: #111827 !important;
  border: 1px solid #d1d5db !important;
  box-shadow: none !important;
}

.profile-badge,
.profile-status-badge,
.item-badge,
.item-action-btn,
.card-edit-btn,
.add-item-btn,
.btn-save,
.btn-cancel,
.modal-close,
.back-btn,
.action-icon-btn {
  border-radius: 12px !important;
}

.profile-tabs {
  display: flex !important;
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  scrollbar-width: thin;
  gap: 10px !important;
  padding: 12px !important;
  background: #ffffff !important;
  border: 1px solid #d1d5db !important;
  border-radius: 12px !important;
  margin-bottom: 24px !important;
}

.profile-tab,
.profile-tab.active,
.profile-tab:hover:not(.active) {
  flex: 1 1 0 !important;
  min-width: 140px !important;
  min-height: 52px !important;
  justify-content: center !important;
  background: #ffffff !important;
  color: #374151 !important;
  border: 1px solid #d1d5db !important;
  border-bottom: 1px solid #d1d5db !important;
  border-radius: 10px !important;
  box-shadow: none !important;
}

.profile-tab.active {
  color: #111827 !important;
  border-color: #9ca3af !important;
  background: #f3f4f6 !important;
}

@media (max-width: 640px) {
  .profile-tab,
  .profile-tab.active,
  .profile-tab:hover:not(.active) {
    min-width: 130px !important;
    min-height: 48px !important;
  }
}

.profile-section-card,
.info-card,
.stat-card,
.item-card,
.modal-content {
  padding: 20px !important;
}

.stat-card {
  text-align: left !important;
}

.stat-card .stat-icon,
.stat-card .stat-value,
.stat-card .stat-label {
  text-align: left !important;
}

.card-header,
.modal-header,
.info-row,
.profile-section-card {
  border-color: #e5e7eb !important;
}

.info-row,
.card-header,
.modal-header {
  border-bottom-color: #e5e7eb !important;
}

.profile-section-grid,
.cards-grid,
.profile-stats-grid {
  gap: 16px !important;
}

.info-card:hover,
.stat-card:hover,
.item-card:hover,
.profile-section-card:hover,
.back-btn:hover,
.action-icon-btn:hover,
.card-edit-btn:hover,
.add-item-btn:hover,
.btn-save:hover,
.btn-cancel:hover,
.item-action-btn:hover,
.modal-close:hover {
  transform: none !important;
  box-shadow: none !important;
}

/* ===== DISTINCT CLEAN BOXES ===== */
.profile-stats-grid .stat-card:nth-child(1),
.profile-section-card--overview {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%) !important;
  border-left: 4px solid #94a3b8 !important;
}

.profile-stats-grid .stat-card:nth-child(2),
.profile-section-card--services {
  background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%) !important;
  border-left: 4px solid #cbd5e1 !important;
}

.profile-stats-grid .stat-card:nth-child(3),
.profile-section-card--availability {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%) !important;
  border-left: 4px solid #a5b4fc !important;
}

.profile-stats-grid .stat-card:nth-child(4),
.profile-section-card--earnings {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%) !important;
  border-left: 4px solid #86efac !important;
}

.profile-section-card--reviews {
  background: linear-gradient(180deg, #ffffff 0%, #fdfdfd 100%) !important;
  border-left: 4px solid #fbbf24 !important;
}

.profile-section-card--overview .card-header,
.profile-section-card--services .card-header,
.profile-section-card--availability .card-header,
.profile-section-card--reviews .card-header,
.profile-section-card--earnings .card-header {
  border-bottom: 1px solid #e5e7eb !important;
}

.profile-section-card--overview .card-title,
.profile-section-card--services .card-title,
.profile-section-card--availability .card-title,
.profile-section-card--reviews .card-title,
.profile-section-card--earnings .card-title {
  color: #0f172a !important;
}

.stat-card .stat-detail,
.stat-card .stat-pill {
  color: #475569 !important;
}

.profile-section-card--overview,
.profile-section-card--services,
.profile-section-card--availability,
.profile-section-card--reviews,
.profile-section-card--earnings {
  background-clip: padding-box !important;
}

/* ===== FINAL ALIGNMENT + SPACING ===== */
.profile-hero-content,
.profile-content {
  max-width: 1120px !important;
}

.profile-header-main {
  align-items: center !important;
  gap: 24px !important;
}

.profile-info {
  display: block !important;
}

.profile-name,
.profile-email,
.profile-member-since {
  margin: 0 0 8px 0 !important;
  line-height: 1.3 !important;
}

.profile-member-since {
  margin: 0 !important;
}

.profile-badges {
  margin: 0 !important;
  align-items: center !important;
}

.profile-tabs {
  align-items: center !important;
  gap: 12px !important;
  margin-bottom: 20px !important;
}

.profile-tab,
.profile-tab.active,
.profile-tab:hover:not(.active) {
  text-align: center !important;
  font-weight: 700 !important;
  letter-spacing: 0.01em !important;
}

.profile-section-shell {
  gap: 14px !important;
}

.profile-section-grid,
.cards-grid {
  gap: 18px !important;
}

.profile-section-card,
.info-card,
.item-card,
.modal-content {
  padding: 20px !important;
}

.card-header,
.modal-header {
  margin-bottom: 16px !important;
  padding-bottom: 12px !important;
  align-items: center !important;
  gap: 12px !important;
}

.card-title,
.modal-title {
  line-height: 1.3 !important;
}

.info-rows {
  gap: 10px !important;
}

.info-row {
  padding: 10px 0 !important;
  align-items: center !important;
  gap: 10px !important;
}

.info-label {
  letter-spacing: 0.04em !important;
  line-height: 1.3 !important;
}

.info-value {
  text-align: right !important;
  line-height: 1.35 !important;
}

.items-list {
  gap: 10px !important;
}

.item-card {
  padding: 14px !important;
}

.item-header {
  margin-bottom: 8px !important;
  align-items: center !important;
  gap: 10px !important;
}

.item-title,
.item-details,
.empty-text,
.empty-subtext {
  line-height: 1.4 !important;
}

.form-group {
  margin-bottom: 14px !important;
}

.form-label {
  margin-bottom: 6px !important;
}

.form-input {
  min-height: 42px !important;
}

.form-actions {
  margin-top: 18px !important;
  gap: 10px !important;
}

@media (max-width: 900px) {
  .profile-header-main {
    flex-direction: column !important;
    text-align: center !important;
  }

  .profile-info {
    justify-items: center !important;
  }

  .profile-section-grid,
  .cards-grid {
    grid-template-columns: 1fr !important;
  }

  .card-header,
  .modal-header,
  .item-header,
  .info-row {
    flex-wrap: wrap !important;
  }
}

@media (max-width: 640px) {
  .profile-content,
  .profile-stats-container,
  .profile-hero {
    padding-left: 14px !important;
    padding-right: 14px !important;
  }

  .profile-tab,
  .profile-tab.active,
  .profile-tab:hover:not(.active) {
    min-width: 122px !important;
  }

  .info-value {
    text-align: left !important;
    width: 100% !important;
  }
}
`

export default function MechanicProfile() {
  const { user, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [mechanic, setMechanic] = useState(null)
  
  // Modals
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false)
  
  // Forms
  const [profileForm, setProfileForm] = useState({ fullName: '', phone: '', email: '', specialization: '' })
  const [serviceForm, setServiceForm] = useState({ name: '', rate: '' })
  const [availabilityForm, setAvailabilityForm] = useState({ startTime: '', endTime: '', serviceArea: '' })
  
  const [editingService, setEditingService] = useState(null)

  useEffect(() => {
    const mechData = getMechanic() || {}
    const nextData = {
      ...mechData,
      ...demoMechanicDefaults,
      services: Array.isArray(mechData.services) && mechData.services.length ? mechData.services : demoMechanicDefaults.services,
      reviews: Array.isArray(mechData.reviews) && mechData.reviews.length ? mechData.reviews : demoMechanicDefaults.reviews,
      availability: {
        ...demoMechanicDefaults.availability,
        ...(mechData.availability || {})
      }
    }

    setMechanic(nextData)
    saveMechanic(nextData)
  }, [])

  const initials = (user?.fullName || 'User').split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
  const joinedDate = user?.joinedDate ? new Date(user.joinedDate) : null
  const membershipDays = joinedDate ? Math.max(0, Math.floor((Date.now() - joinedDate.getTime()) / (1000 * 60 * 60 * 24))) : 0

  const openProfileModal = () => {
    setProfileForm({ 
      fullName: user?.fullName || '', 
      phone: user?.phone || '',
      email: user?.email || '',
      specialization: user?.specialization || ''
    })
    setShowProfileModal(true)
  }

  const saveProfile = () => {
    if(!profileForm.fullName.trim()) {
      alert('Please enter your full name')
      return
    }
    
    const updated = { ...user, fullName: profileForm.fullName, phone: profileForm.phone, specialization: profileForm.specialization }
    updateUser(updated)
    setShowProfileModal(false)
  }

  const addService = () => {
    if(!serviceForm.name.trim() || !serviceForm.rate.trim()) {
      alert('Please fill all service details')
      return
    }

    const service = { ...serviceForm, id: Date.now() }
    const updated = { ...mechanic, services: [...(mechanic?.services || []), service] }
    localStorage.setItem('repairwale_mechanic', JSON.stringify(updated))
    setMechanic(updated)
    setServiceForm({ name: '', rate: '' })
    setShowServiceModal(false)
  }

  const removeService = (id) => {
    if(!confirm('Are you sure you want to remove this service?')) return
    
    const updated = { ...mechanic, services: mechanic.services.filter(s => s.id !== id) }
    localStorage.setItem('repairwale_mechanic', JSON.stringify(updated))
    setMechanic(updated)
  }

  const saveAvailability = () => {
    if(!availabilityForm.startTime || !availabilityForm.endTime || !availabilityForm.serviceArea) {
      alert('Please fill all availability details')
      return
    }

    const updated = { ...mechanic, availability: availabilityForm }
    localStorage.setItem('repairwale_mechanic', JSON.stringify(updated))
    setMechanic(updated)
    setShowAvailabilityModal(false)
  }

  return (
    <div className="profile-wrapper" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <style>{styles}</style>

      {/* Hero Header */}
      <div className="profile-hero">
        <div className="profile-hero-content">
          <div className="profile-header-main">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large">{initials}</div>
              <div className="profile-status-badge">Online</div>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{user?.fullName || 'Demo Mechanic'}</h1>
              <p className="profile-email">{user?.email}</p>
              <div className="profile-badges">
                <span className="profile-badge">Mechanic</span>
                <span className="profile-badge profile-badge--verified">Verified</span>
              </div>
              <p className="profile-member-since">
                Member since {joinedDate?.toLocaleDateString() || 'Recently'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="profile-content">
        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`profile-tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
          <button 
            className={`profile-tab ${activeTab === 'availability' ? 'active' : ''}`}
            onClick={() => setActiveTab('availability')}
          >
            Availability
          </button>
          <button 
            className={`profile-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button 
            className={`profile-tab ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            Earnings
          </button>
        </div>

        {/* TAB: Overview */}
        {activeTab === 'overview' && (
          <div className="profile-section-shell">
            <div className="profile-section-grid">
              <div className="profile-section-card profile-section-card--overview">
                <div className="card-header">
                  <div className="card-title">Personal Information</div>
                  <button className="card-edit-btn" onClick={openProfileModal}>Edit</button>
                </div>
                <div className="info-rows">
                  <div className="info-row">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{user?.fullName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user?.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{user?.phone || 'Not added'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Specialization</span>
                    <span className="info-value highlight">{user?.specialization || 'General'}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section-card profile-section-card--overview">
                <div className="card-header">
                  <div className="card-title">Performance</div>
                </div>
                <div className="info-rows">
                  <div className="info-row">
                    <span className="info-label">Member Since</span>
                    <span className="info-value highlight">{joinedDate?.toLocaleDateString() || 'Recently'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Days Active</span>
                    <span className="info-value highlight">{membershipDays}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Account Status</span>
                    <span className="info-value" style={{color: '#FFFFFF'}}> Active</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Verification</span>
                    <span className="info-value" style={{color: '#FFFFFF'}}> Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Services */}
        {activeTab === 'services' && (
          <div className="profile-section-shell">
            <div className="profile-section-grid">
              <div className="profile-section-card profile-section-card--services full">
                <div className="card-header">
                  <div className="card-title">My Services</div>
                </div>
                
                {(!mechanic?.services || mechanic.services.length === 0) ? (
                  <div className="empty-state">
                    <div className="empty-icon">🧰</div>
                    <div className="empty-text">No services added yet</div>
                    <div className="empty-subtext">Add your services to start accepting requests</div>
                  </div>
                ) : (
                  <div className="items-list">
                    {mechanic.services.map(service => (
                      <div key={service.id} className="item-card">
                        <div className="item-header">
                          <div className="item-title">{service.name}</div>
                          <div className="item-actions">
                            <button className="item-action-btn" onClick={() => removeService(service.id)}>Remove</button>
                          </div>
                        </div>
                        <div className="item-details">Rate: {service.rate} per service</div>
                      </div>
                    ))}
                  </div>
                )}

                <button className="add-item-btn" onClick={() => setShowServiceModal(true)}>
                  + Add New Service
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Availability */}
        {activeTab === 'availability' && (
          <div className="profile-section-shell">
            <div className="profile-section-grid">
              <div className="profile-section-card profile-section-card--availability">
                <div className="card-header">
                  <div className="card-title">Working Hours</div>
                  <button className="card-edit-btn" onClick={() => {
                    setAvailabilityForm(mechanic?.availability || { startTime: '', endTime: '', serviceArea: '' })
                    setShowAvailabilityModal(true)
                  }}>
                    Edit
                  </button>
                </div>
                <div className="info-rows">
                  <div className="info-row">
                    <span className="info-label">Start Time</span>
                    <span className="info-value">{mechanic?.availability?.startTime || 'Not set'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">End Time</span>
                    <span className="info-value">{mechanic?.availability?.endTime || 'Not set'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Service Area</span>
                    <span className="info-value">{mechanic?.availability?.serviceArea || 'Not set'}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section-card profile-section-card--availability">
                <div className="card-header">
                  <div className="card-title">Service Coverage</div>
                </div>
                <div className="info-rows">
                  <div className="info-row">
                    <span className="info-label">Primary Area</span>
                    <span className="info-value highlight">{mechanic?.availability?.serviceArea || 'Not configured'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Flexibility</span>
                    <span className="info-value">High</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Coverage Radius</span>
                    <span className="info-value">10 km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Reviews */}
        {activeTab === 'reviews' && (
          <div className="profile-section-shell">
            <div className="profile-section-grid">
              <div className="profile-section-card profile-section-card--reviews full">
                <div className="card-header">
                  <div className="card-title">Customer Reviews</div>
                </div>

                {(!mechanic?.reviews || mechanic.reviews.length === 0) ? (
                  <div className="empty-state">
                    <div className="empty-icon">💬</div>
                    <div className="empty-text">No reviews yet</div>
                    <div className="empty-subtext">Your reviews will appear here as customers rate your services</div>
                  </div>
                ) : (
                  <div className="items-list">
                    {mechanic.reviews.map(review => (
                      <div key={review.id} className="item-card">
                        <div className="item-header">
                          <div className="item-title">{review.rating} / 5.0 - {review.customerName}</div>
                        </div>
                        <div className="item-details">"{review.comment}"</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB: Earnings */}
        {activeTab === 'earnings' && (
          <div className="profile-section-shell">
            <div className="profile-section-grid">
              <div className="profile-section-card profile-section-card--earnings">
                <div className="card-header">
                  <div className="card-title">Income Summary</div>
                </div>
                <div className="info-rows">
                  <div className="info-row">
                    <span className="info-label">Monthly Earnings</span>
                    <span className="info-value highlight">{mechanic?.monthlyEarnings || 0}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Services This Month</span>
                    <span className="info-value">{mechanic?.servicesThisMonth || 0}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Pending Amount</span>
                    <span className="info-value" style={{color: '#FFFFFF'}}>{mechanic?.pendingAmount || 0}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section-card profile-section-card--earnings">
                <div className="card-header">
                  <div className="card-title">Statistics</div>
                </div>
                <div className="info-rows">
                  <div className="info-row">
                    <span className="info-label">Services This Month</span>
                    <span className="info-value">{mechanic?.servicesThisMonth || 0}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Average Per Service</span>
                    <span className="info-value">{mechanic?.avgPerService || 0}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Payment Status</span>
                    <span className="info-value" style={{color: '#FFFFFF'}}>Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title"> Edit Profile</div>
              <button className="modal-close" onClick={() => setShowProfileModal(false)}>Close</button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={profileForm.fullName}
                onChange={e => setProfileForm({...profileForm, fullName: e.target.value})}
                placeholder="Your full name"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                value={profileForm.email}
                placeholder="Your email"
                disabled
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input 
                type="tel" 
                className="form-input" 
                value={profileForm.phone}
                onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                placeholder="Your phone number"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Specialization</label>
              <input 
                type="text" 
                className="form-input" 
                value={profileForm.specialization}
                onChange={e => setProfileForm({...profileForm, specialization: e.target.value})}
                placeholder="e.g., Engine, Transmission, Brakes"
              />
            </div>
            
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setShowProfileModal(false)}>Cancel</button>
              <button className="btn-save" onClick={saveProfile}>Save Profile</button>
            </div>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="modal-overlay" onClick={() => setShowServiceModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title"> Add Service</div>
              <button className="modal-close" onClick={() => setShowServiceModal(false)}>Close</button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Service Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={serviceForm.name}
                onChange={e => setServiceForm({...serviceForm, name: e.target.value})}
                placeholder="e.g., Engine Oil Change"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Service Rate (INR)</label>
              <input 
                type="number" 
                className="form-input" 
                value={serviceForm.rate}
                onChange={e => setServiceForm({...serviceForm, rate: e.target.value})}
                placeholder="500"
              />
            </div>
            
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setShowServiceModal(false)}>Cancel</button>
              <button className="btn-save" onClick={addService}>Add Service</button>
            </div>
          </div>
        </div>
      )}

      {/* Availability Modal */}
      {showAvailabilityModal && (
        <div className="modal-overlay" onClick={() => setShowAvailabilityModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Update Availability</div>
              <button className="modal-close" onClick={() => setShowAvailabilityModal(false)}>Close</button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Start Time</label>
              <input 
                type="time" 
                className="form-input" 
                value={availabilityForm.startTime}
                onChange={e => setAvailabilityForm({...availabilityForm, startTime: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">End Time</label>
              <input 
                type="time" 
                className="form-input" 
                value={availabilityForm.endTime}
                onChange={e => setAvailabilityForm({...availabilityForm, endTime: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Service Area</label>
              <input 
                type="text" 
                className="form-input" 
                value={availabilityForm.serviceArea}
                onChange={e => setAvailabilityForm({...availabilityForm, serviceArea: e.target.value})}
                placeholder="e.g., North Delhi"
              />
            </div>
            
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setShowAvailabilityModal(false)}>Cancel</button>
              <button className="btn-save" onClick={saveAvailability}>Save Availability</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


