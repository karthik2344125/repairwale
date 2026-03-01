import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/context/AuthContext'
import { getCustomer, saveCustomer } from '../../shared/services/roleData'

const styles = `
.profile-wrapper {
  min-height: 100vh;
  background: linear-gradient(180deg, #0b1220 0%, #0f1728 100%);
  padding: 0;
}

/* ===== HERO HEADER ===== */
.profile-hero {
  background: linear-gradient(140deg, #101f3a 0%, #0d1728 46%, #0a1321 100%);
  padding: 60px 20px 100px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(8, 14, 24, 0.45);
  border-bottom: 1px solid rgba(96, 165, 250, 0.14);
}

.profile-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: 10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.24) 0%, transparent 72%);
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
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 1px solid #2A4368;
  color: #E6EDF7;
  padding: 12px 22px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-size: 14px;
  box-shadow: 0 4px 20px rgba(74, 158, 255, 0.1);
}

.back-btn:hover {
  background: linear-gradient(135deg, #162844 0%, #1a2d52 100%);
  border-color: #4A9EFF;
  color: #60a5fa;
  transform: translateX(-4px);
  box-shadow: 0 8px 32px rgba(74, 158, 255, 0.12);
}

.profile-actions {
  display: flex;
  gap: 10px;
}

.action-icon-btn {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 1px solid #2A4368;
  color: #60a5fa;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(74, 158, 255, 0.1);
}

.action-icon-btn:hover {
  background: linear-gradient(135deg, #162844 0%, #1a2d52 100%);
  border-color: #4A9EFF;
  color: #4A9EFF;
  transform: scale(1.12);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18);
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
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 800;
  color: #0b1220;
  border: 3px solid rgba(96, 165, 250, 0.5);
  box-shadow: 0 0 18px rgba(96, 165, 250, 0.14), 0 12px 40px rgba(8, 14, 24, 0.3);
}

.profile-status-badge {
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  border: 3px solid #0b1220;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 36px;
  font-weight: 900;
  color: #E6EDF7;
  margin: 0 0 8px 0;
  letter-spacing: -1px;
  text-shadow: 0 2px 8px rgba(96, 165, 250, 0.12);
}

.profile-email {
  font-size: 16px;
  color: #a5d6ff;
  margin: 0 0 12px 0;
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
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 1px solid #2A4368;
  color: #60a5fa;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(74, 158, 255, 0.1);
}

.profile-member-since {
  font-size: 14px;
  color: rgba(166, 173, 186, 0.7);
  font-weight: 500;
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
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(8, 14, 24, 0.3);
  transition: all 0.3s ease;
  border: 1px solid #2A4368;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.1), transparent);
  transition: left 0.5s ease;
}

.stat-card:hover::before {
  left: 100%;
}

.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 18px rgba(96, 165, 250, 0.1);
  border-color: #4A9EFF;
}

.stat-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 900;
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #a5d6ff;
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
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  padding: 12px;
  border-radius: 16px;
  border: 1px solid #2A4368;
  overflow-x: auto;
  box-shadow: 0 6px 20px rgba(8, 14, 24, 0.3);
}

.profile-tab {
  flex: 1;
  min-width: fit-content;
  padding: 14px 20px;
  background: transparent;
  border: 1px solid #2A4368;
  color: #a5d6ff;
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
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  color: #0b1220;
  border-color: transparent;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18);
}

.profile-tab:hover:not(.active) {
  background: rgba(96, 165, 250, 0.1);
  color: #4A9EFF;
  border-color: #4A9EFF;
  box-shadow: 0 4px 12px rgba(74, 158, 255, 0.1);
}

/* ===== CARDS ===== */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.info-card {
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 1px solid #2A4368;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 8px 28px rgba(8, 14, 24, 0.4);
  transition: all 0.3s ease;
}

.info-card:hover {
  border-color: #4A9EFF;
  box-shadow: 0 0 14px rgba(96, 165, 250, 0.12);
  transform: translateY(-4px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(96, 165, 250, 0.14);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 800;
  color: #E6EDF7;
}

.card-title-icon {
  font-size: 24px;
}

.card-edit-btn {
  padding: 10px 18px;
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  border: none;
  color: #0b1220;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(96, 165, 250, 0.18);
}

.card-edit-btn:hover {
  background: linear-gradient(135deg, #60A5FF 0%, #4A9EFF 100%);
  color: #0b1220;
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.14);
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
  border-bottom: 1px solid rgba(96, 165, 250, 0.1);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 13px;
  color: rgba(166, 173, 186, 0.7);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 15px;
  color: #E6EDF7;
  font-weight: 600;
  text-align: right;
}

.info-value.highlight {
  color: #60a5fa;
  font-weight: 800;
}

/* ===== LISTS ===== */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item-card {
  background: linear-gradient(135deg, #0d1422 0%, #152239 100%);
  border: 1px solid #2A4368;
  border-radius: 12px;
  padding: 18px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(8, 14, 24, 0.3);
}

.item-card:hover {
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border-color: #4A9EFF;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.12);
  transform: translateY(-2px);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.item-title {
  font-size: 16px;
  font-weight: 800;
  color: #E6EDF7;
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-badge {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  border: 1px solid rgba(96, 165, 250, 0.18);
}

.item-actions {
  display: flex;
  gap: 8px;
}

.item-action-btn {
  padding: 8px 14px;
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 1px solid #2A4368;
  color: #60a5fa;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(8, 14, 24, 0.3);
}

.item-action-btn:hover {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  border-color: transparent;
  color: #0b1220;
  box-shadow: 0 0 15px rgba(96, 165, 250, 0.18);
}

.item-action-btn.danger {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

.item-action-btn.danger:hover {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
}

.item-details {
  font-size: 14px;
  color: #a5d6ff;
  line-height: 1.6;
}

.add-item-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  color: #0b1220;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18);
}

.add-item-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 18px rgba(96, 165, 250, 0.14);
  background: linear-gradient(135deg, #60A5FF 0%, #4A9EFF 100%);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #a5d6ff;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-text {
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 600;
}

.empty-subtext {
  font-size: 14px;
  opacity: 0.7;
}

/* ===== MODAL ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(11, 18, 32, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease;
  backdrop-filter: blur(8px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 1px solid #2A4368;
  border-radius: 20px;
  padding: 36px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 0 24px rgba(96, 165, 250, 0.18), 0 24px 64px rgba(8, 14, 24, 0.6);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes profile-float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(10px, 10px); }
  50% { transform: translate(0, 20px); }
  75% { transform: translate(-10px, 10px); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(96, 165, 250, 0.14);
}

.modal-title {
  font-size: 22px;
  font-weight: 900;
  color: #E6EDF7;
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-close {
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 1px solid #2A4368;
  color: #a5d6ff;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 3px 10px rgba(8, 14, 24, 0.3);
}

.modal-close:hover {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 800;
  color: #a5d6ff;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  background: linear-gradient(135deg, #0d1422 0%, #152239 100%);
  border: 1px solid #2A4368;
  border-radius: 12px;
  color: #E6EDF7;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: inherit;
  box-shadow: 0 4px 12px rgba(8, 14, 24, 0.3);
}

.form-input:focus {
  outline: none;
  border-color: #4A9EFF;
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.12);
}

.form-input::placeholder {
  color: rgba(166, 173, 186, 0.5);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.btn-cancel {
  flex: 1;
  padding: 14px;
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  color: #a5d6ff;
  border: 1px solid #2A4368;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(8, 14, 24, 0.3);
}

.btn-cancel:hover {
  background: linear-gradient(135deg, #162844 0%, #1a2d52 100%);
  color: #E6EDF7;
  border-color: #4A9EFF;
  box-shadow: 0 0 15px rgba(96, 165, 250, 0.1);
}

.btn-save {
  flex: 1;
  padding: 14px;
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  color: #0b1220;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18);
}

.btn-save:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 18px rgba(96, 165, 250, 0.14);
  background: linear-gradient(135deg, #60A5FF 0%, #4A9EFF 100%);
}

/* ===== DARK THEME CONSISTENCY WITH HIGHLIGHTS ===== */
.profile-wrapper {
  background: linear-gradient(180deg, #0B1220 0%, #0F1728 100%) !important;
}

.profile-hero {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), 0 0 100px rgba(74, 158, 255, 0.05) !important;
  border-bottom: 1px solid rgba(74, 158, 255, 0.1);
}

.profile-name,
.card-title,
.item-title,
.modal-title {
  color: #E6EDF7 !important;
  text-shadow: 0 2px 8px rgba(74, 158, 255, 0.1);
}

.stat-value {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 8px rgba(74, 158, 255, 0.18));
}

.info-value {
  color: #E6EDF7 !important;
}

.profile-email,
.profile-member-since,
.stat-label,
.info-label,
.empty-subtext,
.item-details,
.form-label {
  color: rgba(230, 237, 247, 0.7) !important;
}

.profile-badge {
  background: linear-gradient(135deg, #1A3A5C 0%, #2A4368 100%) !important;
  border: 2px solid #4A9EFF !important;
  color: #4A9EFF !important;
  box-shadow: 0 4px 12px rgba(74, 158, 255, 0.1), inset 0 1px 2px rgba(255,255,255,0.1);
}

.back-btn {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border-color: #2A4368 !important;
  color: #E6EDF7 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.back-btn:hover {
  border-color: #4A9EFF !important;
  box-shadow: 0 8px 20px rgba(74, 158, 255, 0.18);
}

.action-icon-btn {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border-color: #2A4368 !important;
  color: #E6EDF7 !important;
  transition: all 0.3s ease;
}

.action-icon-btn:hover {
  border-color: #4A9EFF !important;
  background: linear-gradient(135deg, #1A3A5C 0%, #2A4368 100%) !important;
  box-shadow: 0 8px 24px rgba(74, 158, 255, 0.12);
}

.stat-card {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
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
  background: linear-gradient(90deg, transparent, #4A9EFF, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-card:hover {
  border-color: #4A9EFF !important;
  box-shadow: 0 16px 48px rgba(74, 158, 255, 0.1);
}

.profile-tabs {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border-color: #2A4368 !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}

.profile-tab {
  background: rgba(11, 18, 32, 0.5) !important;
  border-color: #2A4368 !important;
  color: rgba(230, 237, 247, 0.7) !important;
  transition: all 0.3s ease;
}

.profile-tab:hover:not(.active) {
  border-color: #4A9EFF !important;
  color: #E6EDF7 !important;
  background: rgba(26, 58, 92, 0.5) !important;
}

.profile-tab.active {
  background: linear-gradient(135deg, #1A3A5C 0%, #2A4368 100%) !important;
  border-color: #4A9EFF !important;
  color: #4A9EFF !important;
  box-shadow: 0 6px 20px rgba(74, 158, 255, 0.18), inset 0 1px 2px rgba(255,255,255,0.1);
}

.info-card,
.item-card {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.4);
  position: relative;
}

.info-card::after,
.item-card::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #4A9EFF, #60A5FF);
  border-radius: 16px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.info-card:hover::after,
.item-card:hover::after {
  opacity: 0.15;
}

.info-card:hover,
.item-card:hover {
  box-shadow: 0 12px 40px rgba(74, 158, 255, 0.12);
}

.modal-content {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #4A9EFF !important;
  box-shadow: 0 24px 64px rgba(74, 158, 255, 0.1);
}

.form-input {
  background: rgba(11, 18, 32, 0.8) !important;
  border: 2px solid #2A4368 !important;
  color: #E6EDF7 !important;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: #4A9EFF !important;
  background: rgba(26, 58, 92, 0.5) !important;
  box-shadow: 0 0 0 4px rgba(74, 158, 255, 0.1);
}

.btn-cancel {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  color: #E6EDF7 !important;
  border: 2px solid #2A4368 !important;
}

.btn-cancel:hover {
  border-color: #4A9EFF !important;
  box-shadow: 0 6px 16px rgba(74, 158, 255, 0.12);
}

.card-edit-btn,
.item-action-btn {
  background: linear-gradient(135deg, #1A3A5C 0%, #2A4368 100%) !important;
  border: 2px solid #4A9EFF !important;
  color: #4A9EFF !important;
  transition: all 0.2s;
}

.card-edit-btn:hover,
.item-action-btn:hover {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
  color: #FFFFFF !important;
  box-shadow: 0 6px 20px rgba(74, 158, 255, 0.22);
  transform: translateY(-2px);
}

.item-action-btn.danger {
  background: linear-gradient(135deg, #3D1A1A 0%, #5C2A2A 100%) !important;
  color: #FF6B6B !important;
  border-color: #FF6B6B !important;
}

.item-action-btn.danger:hover {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8787 100%) !important;
  color: #FFFFFF !important;
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.modal-close {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
  color: #E6EDF7 !important;
}

.modal-close:hover {
  border-color: #FF6B6B !important;
  color: #FF6B6B !important;
  box-shadow: 0 6px 16px rgba(255, 107, 107, 0.3);
}

.profile-status-badge {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%) !important;
  color: #FFFFFF !important;
  border: 3px solid #0B1220 !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  font-weight: 800;
}

.add-item-btn,
.btn-save {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
  color: #FFFFFF !important;
  border: 2px solid #4A9EFF !important;
  box-shadow: 0 6px 20px rgba(74, 158, 255, 0.22);
  font-weight: 800;
}

.add-item-btn:hover,
.btn-save:hover {
  background: linear-gradient(135deg, #60A5FF 0%, #80B8FF 100%) !important;
  box-shadow: 0 12px 32px rgba(74, 158, 255, 0.28);
  transform: translateY(-4px);
}

.item-badge {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%) !important;
  color: #0B1220 !important;
  border: none !important;
  font-weight: 900;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
}

.info-value.highlight {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900 !important;
  filter: drop-shadow(0 2px 4px rgba(74, 158, 255, 0.18));
}

.form-input::placeholder,
.empty-text {
  color: rgba(230, 237, 247, 0.5) !important;
}

.modal-overlay {
  background: rgba(11, 18, 32, 0.85) !important;
  backdrop-filter: blur(8px);
}

.profile-avatar-large {
  background: linear-gradient(135deg, #1A3A5C 0%, #2A4368 100%) !important;
  border: 4px solid #4A9EFF !important;
  box-shadow: 0 12px 40px rgba(74, 158, 255, 0.12);
}

.card-header {
  border-bottom-color: rgba(74, 158, 255, 0.12) !important;
}

.modal-header {
  border-bottom: 2px solid rgba(74, 158, 255, 0.12) !important;
}

.info-row {
  border-bottom-color: rgba(42, 67, 104, 0.3) !important;
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
`

export default function CustomerProfile() {
  const { user, completeLogout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [customer, setCustomer] = useState(null)
  
  // Modals
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showVehicleModal, setShowVehicleModal] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  
  // Forms
  const [profileForm, setProfileForm] = useState({ fullName: '', phone: '', email: '' })
  const [vehicleForm, setVehicleForm] = useState({ brand: '', model: '', plate: '' })
  const [addressForm, setAddressForm] = useState({ label: '', line: '', city: '', pincode: '' })
  const [paymentForm, setPaymentForm] = useState({ cardName: '', cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '' })
  
  const [editingVehicle, setEditingVehicle] = useState(null)

  useEffect(() => {
    const custData = getCustomer()
    setCustomer(custData)
  }, [])

  const initials = (user?.fullName || 'User').split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
  const joinedDate = user?.joinedDate ? new Date(user.joinedDate) : null
  const membershipDays = joinedDate ? Math.max(0, Math.floor((Date.now() - joinedDate.getTime()) / (1000 * 60 * 60 * 24))) : 0

  const handleLogout = () => {
    if(confirm('Are you sure you want to logout?')) {
      completeLogout()
      navigate('/')
    }
  }

  const openProfileModal = () => {
    setProfileForm({ 
      fullName: user?.fullName || '', 
      phone: user?.phone || '',
      email: user?.email || ''
    })
    setShowProfileModal(true)
  }

  const saveProfile = () => {
    if(!profileForm.fullName.trim()) {
      alert('Please enter your full name')
      return
    }
    
    const updated = { ...user, fullName: profileForm.fullName, phone: profileForm.phone }
    localStorage.setItem('repairwale_user', JSON.stringify(updated))
    setShowProfileModal(false)
    window.location.reload()
  }

  const openVehicleModal = (vehicle = null) => {
    if(vehicle) {
      setVehicleForm({ brand: vehicle.brand, model: vehicle.model, plate: vehicle.plate })
      setEditingVehicle(vehicle.id)
    } else {
      setVehicleForm({ brand: '', model: '', plate: '' })
      setEditingVehicle(null)
    }
    setShowVehicleModal(true)
  }

  const saveVehicle = () => {
    if(!vehicleForm.brand.trim() || !vehicleForm.model.trim()) {
      alert('Please enter vehicle brand and model')
      return
    }
    
    if(!customer) {
      alert('Customer data not loaded')
      return
    }
    
    if(editingVehicle) {
      const next = { ...customer, vehicles: (customer.vehicles || []).map(v => 
        v.id === editingVehicle ? { ...v, ...vehicleForm } : v
      )}
      setCustomer(next)
      saveCustomer(next)
    } else {
      const vehicles = customer.vehicles || []
      const v = { id: `VH-${Date.now()}`, ...vehicleForm, primary: vehicles.length === 0 }
      const next = { ...customer, vehicles: [...vehicles, v] }
      setCustomer(next)
      saveCustomer(next)
    }
    
    setShowVehicleModal(false)
    setVehicleForm({ brand: '', model: '', plate: '' })
    setEditingVehicle(null)
  }

  const removeVehicle = (id) => {
    if(!customer) return
    if(!confirm('Remove this vehicle?')) return
    const next = { ...customer, vehicles: (customer.vehicles || []).filter(v => v.id !== id) }
    setCustomer(next)
    saveCustomer(next)
  }

  const makePrimary = (id) => {
    if(!customer) return
    const next = { ...customer, vehicles: (customer.vehicles || []).map(v => ({ ...v, primary: v.id === id })) }
    setCustomer(next)
    saveCustomer(next)
  }

  const openAddressModal = () => {
    setAddressForm({ label: '', line: '', city: '', pincode: '' })
    setShowAddressModal(true)
  }

  const saveAddress = () => {
    if(!addressForm.label.trim() || !addressForm.line.trim()) {
      alert('Please enter address label and line')
      return
    }
    
    if(!customer) {
      alert('Customer data not loaded')
      return
    }
    
    const a = { id: `ADDR-${Date.now()}`, ...addressForm }
    const next = { ...customer, addresses: [...(customer.addresses || []), a] }
    setCustomer(next)
    saveCustomer(next)
    
    setShowAddressModal(false)
    setAddressForm({ label: '', line: '', city: '', pincode: '' })
  }

  const removeAddress = (id) => {
    if(!customer) return
    if(!confirm('Remove this address?')) return
    const next = { ...customer, addresses: (customer.addresses || []).filter(a => a.id !== id) }
    setCustomer(next)
    saveCustomer(next)
  }

  const openPaymentModal = () => {
    setPaymentForm({ cardName: '', cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '' })
    setShowPaymentModal(true)
  }

  const savePayment = () => {
    if(!paymentForm.cardName.trim() || !paymentForm.cardNumber.trim() || !paymentForm.expiryMonth || !paymentForm.expiryYear || !paymentForm.cvv) {
      alert('Please fill in all payment details')
      return
    }
    
    if(!customer) {
      alert('Customer data not loaded')
      return
    }
    
    const pm = { 
      id: `PM-${Date.now()}`, 
      cardName: paymentForm.cardName,
      cardLast4: paymentForm.cardNumber.slice(-4),
      expiryMonth: paymentForm.expiryMonth,
      expiryYear: paymentForm.expiryYear,
      isDefault: (!customer.paymentMethods || customer.paymentMethods.length === 0)
    }
    
    const next = { ...customer, paymentMethods: [...(customer.paymentMethods || []), pm] }
    setCustomer(next)
    saveCustomer(next)
    
    setShowPaymentModal(false)
    setPaymentForm({ cardName: '', cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '' })
  }

  const removePayment = (id) => {
    if(!customer) return
    if(!confirm('Remove this payment method?')) return
    const next = { ...customer, paymentMethods: (customer.paymentMethods || []).filter(p => p.id !== id) }
    setCustomer(next)
    saveCustomer(next)
  }

  const setDefaultPayment = (id) => {
    if(!customer) return
    const next = { ...customer, paymentMethods: (customer.paymentMethods || []).map(p => ({ ...p, isDefault: p.id === id })) }
    setCustomer(next)
    saveCustomer(next)
  }

  return (
    <div className="profile-wrapper">
      <style>{styles}</style>
      
      {/* Hero Header */}
      <div className="profile-hero">
        <div className="profile-hero-content">
          <div className="profile-top-nav">
            <button className="back-btn" onClick={() => navigate('/customer')}>
              ← Back to Home
            </button>
            <div className="profile-actions">
              <button className="action-icon-btn" onClick={() => navigate('/favorites')} title="Favorites">
                ❤
              </button>
              <button className="action-icon-btn" onClick={handleLogout} title="Logout">
                ⎋
              </button>
            </div>
          </div>
          
          <div className="profile-header-main">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large">{initials}</div>
              <div className="profile-status-badge">Verified</div>
            </div>
            
            <div className="profile-info">
              <h1 className="profile-name">{user?.fullName || 'My Profile'}</h1>
              <p className="profile-email">{user?.email}</p>
              <div className="profile-badges">
                <span className="profile-badge">Customer</span>
                <span className="profile-badge">4.8 Rating</span>
              </div>
              <p className="profile-member-since">
                Member since {joinedDate?.toLocaleDateString() || 'Recently'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="profile-stats-container">
        <div className="profile-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-value">{membershipDays}</div>
            <div className="stat-label">Days Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-value">{customer?.orders?.length || 0}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚗</div>
            <div className="stat-value">{customer?.vehicles?.length || 0}</div>
            <div className="stat-label">Vehicles</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📍</div>
            <div className="stat-value">{customer?.addresses?.length || 0}</div>
            <div className="stat-label">Addresses</div>
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
            <span>📊</span> Overview
          </button>
          <button 
            className={`profile-tab ${activeTab === 'vehicles' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicles')}
          >
            <span>🚗</span> Vehicles
          </button>
          <button 
            className={`profile-tab ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            <span>📍</span> Addresses
          </button>
          <button 
            className={`profile-tab ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <span>💳</span> Payments
          </button>
        </div>

        {/* TAB: Overview */}
        {activeTab === 'overview' && (
          <div className="cards-grid">
            <div className="info-card">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-title-icon">👤</span>
                  Personal Information
                </div>
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
                  <span className="info-label">Member Since</span>
                  <span className="info-value highlight">{joinedDate?.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-title-icon">📊</span>
                  Account Statistics
                </div>
              </div>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-label">Total Orders</span>
                  <span className="info-value highlight">{customer?.orders?.length || 0}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Rating</span>
                  <span className="info-value highlight">⭐ 4.8 / 5.0</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Account Status</span>
                  <span className="info-value" style={{color: '#E6EDF7'}}>Active</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email Status</span>
                  <span className="info-value" style={{color: '#E6EDF7'}}>Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Vehicles */}
        {activeTab === 'vehicles' && (
          <div className="cards-grid">
            <div className="info-card" style={{gridColumn: '1 / -1'}}>
              <div className="card-header">
                <div className="card-title">
                  <span className="card-title-icon">🚗</span>
                  My Vehicles
                </div>
              </div>
              
              {(!customer?.vehicles || customer.vehicles.length === 0) ? (
                <div className="empty-state">
                  <div className="empty-icon">🚗</div>
                  <div className="empty-text">No vehicles added yet</div>
                  <div className="empty-subtext">Add your first vehicle to get started</div>
                </div>
              ) : (
                <div className="items-list">
                  {customer.vehicles.map(vehicle => (
                    <div key={vehicle.id} className="item-card">
                      <div className="item-header">
                        <div className="item-title">
                          🚗 {vehicle.brand} {vehicle.model}
                          {vehicle.primary && <span className="item-badge">Primary</span>}
                        </div>
                        <div className="item-actions">
                          {!vehicle.primary && (
                            <button className="item-action-btn" onClick={() => makePrimary(vehicle.id)}>
                              Set Primary
                            </button>
                          )}
                          <button className="item-action-btn" onClick={() => openVehicleModal(vehicle)}>
                            Edit
                          </button>
                          <button className="item-action-btn danger" onClick={() => removeVehicle(vehicle.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="item-details">
                        Plate: {vehicle.plate || 'Not specified'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <button className="add-item-btn" onClick={() => openVehicleModal()}>
                + Add New Vehicle
              </button>
            </div>
          </div>
        )}

        {/* TAB: Addresses */}
        {activeTab === 'addresses' && (
          <div className="cards-grid">
            <div className="info-card" style={{gridColumn: '1 / -1'}}>
              <div className="card-header">
                <div className="card-title">
                  <span className="card-title-icon">📍</span>
                  Saved Addresses
                </div>
              </div>
              
              {(!customer?.addresses || customer.addresses.length === 0) ? (
                <div className="empty-state">
                  <div className="empty-icon">📍</div>
                  <div className="empty-text">No addresses saved yet</div>
                  <div className="empty-subtext">Add an address for faster checkout</div>
                </div>
              ) : (
                <div className="items-list">
                  {customer.addresses.map(address => (
                    <div key={address.id} className="item-card">
                      <div className="item-header">
                        <div className="item-title">
                          📍 {address.label}
                        </div>
                        <div className="item-actions">
                          <button className="item-action-btn danger" onClick={() => removeAddress(address.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="item-details">
                        {address.line}<br/>
                        {address.city} - {address.pincode}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <button className="add-item-btn" onClick={openAddressModal}>
                + Add New Address
              </button>
            </div>
          </div>
        )}

        {/* TAB: Payments */}
        {activeTab === 'payments' && (
          <div className="cards-grid">
            <div className="info-card" style={{gridColumn: '1 / -1'}}>
              <div className="card-header">
                <div className="card-title">
                  <span className="card-title-icon">💳</span>
                  Payment Methods
                </div>
              </div>
              
              {(!customer?.paymentMethods || customer.paymentMethods.length === 0) ? (
                <div className="empty-state">
                  <div className="empty-icon">💳</div>
                  <div className="empty-text">No payment methods added</div>
                  <div className="empty-subtext">Add a payment method for faster checkout</div>
                </div>
              ) : (
                <div className="items-list">
                  {customer.paymentMethods.map(payment => (
                    <div key={payment.id} className="item-card">
                      <div className="item-header">
                        <div className="item-title">
                          💳 {payment.cardName}
                          {payment.isDefault && <span className="item-badge">Default</span>}
                        </div>
                        <div className="item-actions">
                          {!payment.isDefault && (
                            <button className="item-action-btn" onClick={() => setDefaultPayment(payment.id)}>
                              Set Default
                            </button>
                          )}
                          <button className="item-action-btn danger" onClick={() => removePayment(payment.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="item-details">
                        •••• •••• •••• {payment.cardLast4}<br/>
                        Expires: {payment.expiryMonth}/{payment.expiryYear}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <button className="add-item-btn" onClick={openPaymentModal}>
                + Add Payment Method
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      
      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">✏️ Edit Profile</div>
              <button className="modal-close" onClick={() => setShowProfileModal(false)}>×</button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={profileForm.fullName}
                onChange={e => setProfileForm({...profileForm, fullName: e.target.value})}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                type="tel" 
                className="form-input" 
                value={profileForm.phone}
                onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                placeholder="Enter your phone number"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email (Read-only)</label>
              <input 
                type="email" 
                className="form-input" 
                value={profileForm.email}
                disabled
                style={{opacity: 0.6}}
              />
            </div>
            
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setShowProfileModal(false)}>Cancel</button>
              <button className="btn-save" onClick={saveProfile}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Modal */}
      {showVehicleModal && (
        <div className="modal-overlay" onClick={() => setShowVehicleModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">🚗 {editingVehicle ? 'Edit' : 'Add'} Vehicle</div>
              <button className="modal-close" onClick={() => setShowVehicleModal(false)}>×</button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Brand</label>
              <input 
                type="text" 
                className="form-input" 
                value={vehicleForm.brand}
                onChange={e => setVehicleForm({...vehicleForm, brand: e.target.value})}
                placeholder="e.g., Toyota, Honda"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Model</label>
              <input 
                type="text" 
                className="form-input" 
                value={vehicleForm.model}
                onChange={e => setVehicleForm({...vehicleForm, model: e.target.value})}
                placeholder="e.g., Camry, Civic"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">License Plate</label>
              <input 
                type="text" 
                className="form-input" 
                value={vehicleForm.plate}
                onChange={e => setVehicleForm({...vehicleForm, plate: e.target.value})}
                placeholder="e.g., ABC 1234"
              />
            </div>
            
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setShowVehicleModal(false)}>Cancel</button>
              <button className="btn-save" onClick={saveVehicle}>Save Vehicle</button>
            </div>
          </div>
        </div>
      )}

      {/* Address Modal */}
      {showAddressModal && (
        <div className="modal-overlay" onClick={() => setShowAddressModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">📍 Add Address</div>
              <button className="modal-close" onClick={() => setShowAddressModal(false)}>×</button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Label</label>
              <input 
                type="text" 
                className="form-input" 
                value={addressForm.label}
                onChange={e => setAddressForm({...addressForm, label: e.target.value})}
                placeholder="e.g., Home, Office"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Address Line</label>
              <input 
                type="text" 
                className="form-input" 
                value={addressForm.line}
                onChange={e => setAddressForm({...addressForm, line: e.target.value})}
                placeholder="Street address"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">City</label>
              <input 
                type="text" 
                className="form-input" 
                value={addressForm.city}
                onChange={e => setAddressForm({...addressForm, city: e.target.value})}
                placeholder="City name"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input 
                type="text" 
                className="form-input" 
                value={addressForm.pincode}
                onChange={e => setAddressForm({...addressForm, pincode: e.target.value})}
                placeholder="6-digit pincode"
              />
            </div>
            
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setShowAddressModal(false)}>Cancel</button>
              <button className="btn-save" onClick={saveAddress}>Save Address</button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">💳 Add Payment Method</div>
              <button className="modal-close" onClick={() => setShowPaymentModal(false)}>×</button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Cardholder Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={paymentForm.cardName}
                onChange={e => setPaymentForm({...paymentForm, cardName: e.target.value})}
                placeholder="Name on card"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input 
                type="text" 
                className="form-input" 
                value={paymentForm.cardNumber}
                onChange={e => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
                placeholder="16-digit card number"
                maxLength="16"
              />
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px'}}>
              <div className="form-group">
                <label className="form-label">Month</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={paymentForm.expiryMonth}
                  onChange={e => setPaymentForm({...paymentForm, expiryMonth: e.target.value})}
                  placeholder="MM"
                  maxLength="2"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Year</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={paymentForm.expiryYear}
                  onChange={e => setPaymentForm({...paymentForm, expiryYear: e.target.value})}
                  placeholder="YY"
                  maxLength="2"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">CVV</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={paymentForm.cvv}
                  onChange={e => setPaymentForm({...paymentForm, cvv: e.target.value})}
                  placeholder="CVV"
                  maxLength="4"
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setShowPaymentModal(false)}>Cancel</button>
              <button className="btn-save" onClick={savePayment}>Save Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
