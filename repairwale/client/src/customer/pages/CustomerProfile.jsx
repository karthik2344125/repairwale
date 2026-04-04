import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/context/AuthContext'
import { getCustomer, saveCustomer } from '../../shared/services/roleData'
import { IconUser, IconStar, IconShield, IconList, IconTruck, IconMapPin, IconCard, IconCompass, IconSpark } from '../../icons'

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
  border-color: #0B1F3B;
  color: #FFFFFF;
  transform: translateX(-4px);
  box-shadow: 0 8px 32px rgba(29,99,255,0.12);
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
  color: #FFFFFF;
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
  border-color: #0B1F3B;
  color: #FFFFFF;
  transform: scale(1.12);
  box-shadow: 0 0 12px rgba(29,99,255,0.18);
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
  color: #FFFFFF;
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
  border: 1px solid #0B1F3B;
  color: #0B1F3B;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(29,99,255,0.1);
}

.profile-member-since {
  font-size: 14px;
  color: rgba(255,206,50,0.7);
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
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  border: 1px solid #0B1F3B;
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
  background: linear-gradient(90deg, transparent, rgba(29,99,255,0.1), transparent);
  transition: left 0.5s ease;
}

.stat-card:hover::before {
  left: 100%;
}

.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 18px rgba(29,99,255,0.1);
  border-color: #0B1F3B;
}

.stat-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 900;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #FFFFFF;
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
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  padding: 12px;
  border-radius: 16px;
  border: 1px solid #0B1F3B;
  overflow-x: auto;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.profile-tab {
  flex: 1;
  min-width: fit-content;
  padding: 14px 20px;
  background: transparent;
  border: 1px solid #0B1F3B;
  color: #FFFFFF;
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
  border-color: transparent;
  box-shadow: 0 0 12px rgba(29,99,255,0.18);
}

.profile-tab:hover:not(.active) {
  background: rgba(29,99,255,0.1);
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
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 1px solid #0B1F3B;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.4);
  transition: all 0.3s ease;
}

.info-card:hover {
  border-color: #0B1F3B;
  box-shadow: 0 0 14px rgba(29,99,255,0.12);
  transform: translateY(-4px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(29,99,255,0.14);
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
  border: none;
  color: #FFFFFF;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(29,99,255,0.18);
}

.card-edit-btn:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(29,99,255,0.14);
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
  border-bottom: 1px solid rgba(29,99,255,0.1);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 13px;
  color: rgba(255,206,50,0.7);
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
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 1px solid #0B1F3B;
  border-radius: 12px;
  padding: 18px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}

.item-card:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border-color: #0B1F3B;
  box-shadow: 0 0 12px rgba(29,99,255,0.12);
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
  color: #FFFFFF;
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-badge {
  background: rgba(29,99,255,0.1);
  color: #0B1F3B;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  border: 1px solid rgba(29,99,255,0.18);
}

.item-actions {
  display: flex;
  gap: 8px;
}

.item-action-btn {
  padding: 8px 14px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 1px solid #0B1F3B;
  color: #FFFFFF;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.item-action-btn:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border-color: transparent;
  color: #FFFFFF;
  box-shadow: 0 0 15px rgba(29,99,255,0.18);
}

.item-action-btn.danger {
  color: #FFFFFF;
  border-color: rgba(255,206,50,0.3);
}

.item-action-btn.danger:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 0 15px rgba(255,206,50,0.3);
}

.item-details {
  font-size: 14px;
  color: #FFFFFF;
  line-height: 1.6;
}

.add-item-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  color: #FFFFFF;
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
  box-shadow: 0 0 12px rgba(29,99,255,0.18);
}

.add-item-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 18px rgba(29,99,255,0.14);
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #FFFFFF;
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
  background: rgba(29,99,255,0.92);
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
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 1px solid #0B1F3B;
  border-radius: 20px;
  padding: 36px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 0 24px rgba(29,99,255,0.18), 0 24px 64px rgba(0,0,0,0.6);
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
  border-bottom: 1px solid rgba(29,99,255,0.14);
}

.modal-title {
  font-size: 22px;
  font-weight: 900;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-close {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 1px solid #0B1F3B;
  color: #FFFFFF;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
}

.modal-close:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 0 15px rgba(255,206,50,0.3);
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 1px solid #0B1F3B;
  border-radius: 12px;
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: inherit;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.form-input:focus {
  outline: none;
  border-color: #0B1F3B;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  box-shadow: 0 0 12px rgba(29,99,255,0.12);
}

.form-input::placeholder {
  color: rgba(255,206,50,0.5);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.btn-cancel {
  flex: 1;
  padding: 14px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  color: #FFFFFF;
  border: 1px solid #0B1F3B;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.btn-cancel:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  color: #FFFFFF;
  border-color: #0B1F3B;
  box-shadow: 0 0 15px rgba(29,99,255,0.1);
}

.btn-save {
  flex: 1;
  padding: 14px;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  color: #0B1F3B;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 12px rgba(29,99,255,0.18);
}

.btn-save:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 18px rgba(29,99,255,0.14);
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
}

/* ===== DARK THEME CONSISTENCY WITH HIGHLIGHTS ===== */
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
.item-title,
.modal-title {
  color: #FFFFFF !important;
  text-shadow: 0 2px 8px rgba(29,99,255,0.1);
}

.stat-value {
  background: none;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: #FFFFFF;
  background-clip: initial;
  color: #FFFFFF !important;
  filter: drop-shadow(0 2px 8px rgba(29,99,255,0.18));
}

.info-value {
  color: #FFFFFF !important;
}

.profile-email,
.profile-member-since,
.stat-label,
.info-label,
.empty-subtext,
.item-details,
.form-label {
  color: rgba(255,255,255,0.7) !important;
}

.profile-badge {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
  color: #FFFFFF !important;
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
  color: #FFFFFF !important;
  box-shadow: 0 6px 20px rgba(29,99,255,0.18), inset 0 1px 2px rgba(255,255,255,0.1);
}

.info-card,
.item-card {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
  box-shadow: 0 8px 28px rgba(0,0,0,0.4);
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
  background: linear-gradient(135deg, #0B1F3B, #0B1F3B);
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
  box-shadow: 0 12px 40px rgba(29,99,255,0.12);
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

.card-edit-btn,
.item-action-btn {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
  color: #FFFFFF !important;
  transition: all 0.2s;
}

.card-edit-btn:hover,
.item-action-btn:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #FFFFFF !important;
  box-shadow: 0 6px 20px rgba(29,99,255,0.22);
  transform: translateY(-2px);
}

.item-action-btn.danger {
  background: transparent !important;
  color: #FFFFFF !important;
  border-color: rgba(255,255,255,0.4) !important;
}

.item-action-btn.danger:hover {
  background: #0B1F3B !important;
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
  color: #0B1F3B !important;
  border: 3px solid #0B1F3B !important;
  box-shadow: 0 4px 12px rgba(255,206,50,0.4);
  font-weight: 800;
}

.add-item-btn,
.btn-save {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #FFFFFF !important;
  border: 2px solid #0B1F3B !important;
  box-shadow: 0 6px 20px rgba(29,99,255,0.22);
  font-weight: 800;
}

.add-item-btn:hover,
.btn-save:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  box-shadow: 0 12px 32px rgba(29,99,255,0.28);
  transform: translateY(-4px);
}

.item-badge {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #0B1F3B !important;
  border: none !important;
  font-weight: 900;
  box-shadow: 0 2px 8px rgba(255,206,50,0.3);
}

.info-value.highlight {
  background: none;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: #FFFFFF;
  background-clip: initial;
  color: #FFFFFF !important;
  font-weight: 900 !important;
  filter: drop-shadow(0 2px 4px rgba(29,99,255,0.18));
}

.form-input::placeholder,
.empty-text {
  color: #FFFFFF !important;
}

.modal-overlay {
  background: rgba(29,99,255,0.85) !important;
  backdrop-filter: blur(8px);
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

/* ===== FINAL VISIBILITY FIXES ===== */
.profile-badge,
.item-badge,
.profile-status-badge,
.profile-tab.active,
.info-value.highlight,
.stat-value {
  color: #eaf2ff !important;
  -webkit-text-fill-color: #eaf2ff !important;
}

.profile-badge,
.item-badge,
.profile-status-badge {
  border-color: rgba(132, 168, 225, 0.45) !important;
}

.stat-icon,
.card-title-icon,
.empty-icon,
.icon-inline {
  color: #dce9ff !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg,
.card-title-icon svg,
.empty-icon svg,
.icon-inline svg,
.action-icon-btn svg {
  display: block;
}

.action-icon-btn,
.back-btn,
.profile-tab,
.card-edit-btn,
.item-action-btn,
.add-item-btn,
.btn-cancel,
.btn-save,
.modal-close {
  color: #eaf2ff !important;
}

.profile-email,
.profile-member-since,
.stat-label,
.info-label,
.item-details,
.empty-text,
.empty-subtext,
.form-label,
.form-input,
.form-input::placeholder {
  color: rgba(234, 242, 255, 0.86) !important;
}

.empty-icon {
  min-height: 64px;
}

/* ===== GRID CORRECTION + FLAT NAVY SURFACE ===== */
.profile-stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 18px !important;
}

.cards-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 20px !important;
  align-items: start;
}

.profile-stats-grid > .stat-card {
  min-height: 158px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cards-grid > .info-card {
  height: 100%;
}

.cards-grid > .info-card[style*='grid-column: 1 / -1'] {
  height: auto;
}

.info-rows {
  flex: 1;
}

.stat-card,
.info-card,
.item-card,
.profile-tabs,
.profile-tab,
.modal-content,
.form-input,
.card-edit-btn,
.item-action-btn,
.add-item-btn,
.btn-cancel,
.btn-save,
.back-btn,
.action-icon-btn,
.modal-close,
.profile-badge,
.item-badge,
.profile-avatar-large,
.profile-status-badge {
  box-shadow: none !important;
  text-shadow: none !important;
  filter: none !important;
}

.stat-card,
.info-card,
.item-card,
.profile-tabs,
.modal-content {
  background: rgba(10, 30, 58, 0.56) !important;
  border-radius: 16px !important;
}

.form-input {
  background: rgba(12, 36, 69, 0.58) !important;
  border-radius: 12px !important;
}

.profile-tab,
.card-edit-btn,
.item-action-btn,
.add-item-btn,
.btn-cancel,
.btn-save,
.back-btn,
.action-icon-btn,
.modal-close,
.profile-badge,
.item-badge,
.profile-status-badge {
  background: rgba(14, 40, 76, 0.5) !important;
  border-radius: 12px !important;
}

.profile-avatar-large {
  background: rgba(14, 40, 76, 0.48) !important;
  border-radius: 18px !important;
}

.stat-card,
.info-card,
.item-card,
.profile-tabs,
.modal-content,
.form-input,
.profile-badge,
.item-badge,
.profile-avatar-large,
.profile-status-badge {
  border: 1px solid rgba(124, 160, 217, 0.35) !important;
}

.profile-tab {
  border: 1px solid transparent !important;
  border-bottom: 2px solid transparent !important;
  padding-inline: 10px !important;
}

.profile-tab.active {
  background: rgba(45, 95, 163, 0.35) !important;
  border-bottom-color: #8db4f0 !important;
}

.profile-member-since,
.info-label,
.form-input::placeholder,
.item-action-btn.danger {
  color: rgba(187, 209, 241, 0.88) !important;
}

.item-action-btn.danger {
  border-color: rgba(124, 160, 217, 0.35) !important;
}

.item-header {
  gap: 10px;
  flex-wrap: wrap;
}

.item-actions {
  flex-wrap: wrap;
  justify-content: flex-end;
}

.action-text-btn {
  min-height: 44px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 700;
}

.stat-card:hover,
.info-card:hover,
.item-card:hover,
.profile-tab:hover,
.card-edit-btn:hover,
.item-action-btn:hover,
.add-item-btn:hover,
.btn-cancel:hover,
.btn-save:hover,
.back-btn:hover,
.action-icon-btn:hover,
.modal-close:hover {
  box-shadow: none !important;
  transform: none !important;
  filter: none !important;
}

/* ===== CLASSIC NAVY FLAT THEME ===== */
.profile-wrapper,
.profile-hero,
.profile-tabs,
.stat-card,
.info-card,
.item-card,
.modal-content,
.form-input,
.profile-badge,
.item-badge,
.profile-status-badge,
.profile-avatar-large,
.back-btn,
.action-icon-btn,
.card-edit-btn,
.item-action-btn,
.add-item-btn,
.btn-cancel,
.btn-save,
.modal-close,
.profile-tab,
.profile-tab.active {
  background: #0b1f3b !important;
  background-image: none !important;
  box-shadow: none !important;
  text-shadow: none !important;
  filter: none !important;
  backdrop-filter: none !important;
}

.profile-hero::before,
.stat-card::before,
.info-card::after,
.item-card::after {
  display: none !important;
  content: none !important;
}

.profile-wrapper,
.profile-hero,
.profile-content,
.modal-content {
  border-color: #23466f !important;
}

.profile-tab,
.back-btn,
.action-icon-btn,
.card-edit-btn,
.item-action-btn,
.add-item-btn,
.btn-cancel,
.btn-save,
.modal-close,
.form-input,
.profile-badge,
.item-badge,
.profile-status-badge {
  border: 1px solid #2a527f !important;
}

.profile-name,
.profile-email,
.profile-member-since,
.card-title,
.info-label,
.info-value,
.item-title,
.item-details,
.form-label,
.form-input,
.form-input::placeholder,
.stat-label,
.stat-value,
.empty-text,
.empty-subtext,
.modal-title {
  color: #e8f1ff !important;
  -webkit-text-fill-color: #e8f1ff !important;
}

.profile-tab.active {
  border-bottom-color: #7fa9de !important;
}

.modal-overlay {
  background: rgba(11, 31, 59, 0.9) !important;
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
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }

  .cards-grid {
    grid-template-columns: 1fr !important;
  }

  .profile-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .profile-stats-grid > .stat-card {
    min-height: 140px;
  }

  .profile-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
  }
}

@media (max-width: 480px) {
  .profile-stats-grid {
    grid-template-columns: 1fr !important;
  }

  .profile-top-nav {
    gap: 12px;
    flex-wrap: wrap;
  }

  .profile-actions {
    width: 100%;
    justify-content: flex-start;
  }

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
  const { user, updateUser } = useAuth()
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

  const joinedDate = user?.joinedDate ? new Date(user.joinedDate) : null
  const membershipDays = joinedDate ? Math.max(0, Math.floor((Date.now() - joinedDate.getTime()) / (1000 * 60 * 60 * 24))) : 0

  const displayUser = useMemo(() => {
    const demoJoined = '2024-08-12T00:00:00.000Z'
    return {
      fullName: user?.fullName || 'Aarav Mehta',
      email: user?.email || 'aarav.mehta@repairwale.in',
      phone: user?.phone || '+91 98765 43210',
      joinedDate: user?.joinedDate || demoJoined
    }
  }, [user])

  const displayCustomer = useMemo(() => {
    const fallback = {
      orders: [
        { id: 'ORD-10482', status: 'Completed', totalAmount: 2499, createdAt: '2026-03-18T10:20:00.000Z' },
        { id: 'ORD-10466', status: 'Completed', totalAmount: 1499, createdAt: '2026-03-03T15:40:00.000Z' },
        { id: 'ORD-10445', status: 'In Progress', totalAmount: 3299, createdAt: '2026-02-21T09:10:00.000Z' },
        { id: 'ORD-10411', status: 'Completed', totalAmount: 999, createdAt: '2026-02-05T18:30:00.000Z' },
        { id: 'ORD-10389', status: 'Completed', totalAmount: 1899, createdAt: '2026-01-28T11:50:00.000Z' },
        { id: 'ORD-10352', status: 'Completed', totalAmount: 2799, createdAt: '2026-01-14T13:00:00.000Z' }
      ],
      vehicles: [
        { id: 'VH-88001', brand: 'Hyundai', model: 'Creta SX', plate: 'MH12 AB 4821', primary: true },
        { id: 'VH-88002', brand: 'Honda', model: 'City VX', plate: 'MH14 KR 9102', primary: false }
      ],
      addresses: [
        { id: 'ADDR-5001', label: 'Home', line: 'Flat 902, Orchid Heights, Baner Road', city: 'Pune', pincode: '411045' },
        { id: 'ADDR-5002', label: 'Office', line: 'Tower B, Cyber One IT Park, Hinjewadi', city: 'Pune', pincode: '411057' }
      ],
      paymentMethods: [
        { id: 'PM-7001', cardName: 'HDFC Regalia', cardLast4: '4721', expiryMonth: '09', expiryYear: '28', isDefault: true },
        { id: 'PM-7002', cardName: 'ICICI Coral', cardLast4: '1198', expiryMonth: '02', expiryYear: '27', isDefault: false }
      ]
    }

    const src = customer || {}
    return {
      ...src,
      orders: (src.orders && src.orders.length > 0) ? src.orders : fallback.orders,
      vehicles: (src.vehicles && src.vehicles.length > 0) ? src.vehicles : fallback.vehicles,
      addresses: (src.addresses && src.addresses.length > 0) ? src.addresses : fallback.addresses,
      paymentMethods: (src.paymentMethods && src.paymentMethods.length > 0) ? src.paymentMethods : fallback.paymentMethods
    }
  }, [customer])

  const displayInitials = (displayUser.fullName || 'User').split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
  const displayJoinedDate = displayUser.joinedDate ? new Date(displayUser.joinedDate) : joinedDate
  const displayMembershipDays = displayJoinedDate
    ? Math.max(0, Math.floor((Date.now() - displayJoinedDate.getTime()) / (1000 * 60 * 60 * 24)))
    : membershipDays

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
    updateUser(updated)
    setShowProfileModal(false)
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
    <div className="profile-wrapper" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <style>{styles}</style>
      
      {/* Hero Header */}
      <div className="profile-hero">
        <div className="profile-hero-content">
          <div className="profile-top-nav">
            <button className="back-btn" onClick={() => navigate('/customer')}>
              <span className="icon-inline" aria-hidden>←</span>
              Back to Home
            </button>
            <div className="profile-actions">
              <button className="action-icon-btn" onClick={() => navigate('/favorites')} title="Favorites" aria-label="Favorites">
                <IconStar size={20} />
              </button>
            </div>
          </div>
          
          <div className="profile-header-main">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large">{displayInitials}</div>
              <div className="profile-status-badge">Verified</div>
            </div>
            
            <div className="profile-info">
              <h1 className="profile-name">{displayUser.fullName || 'My Profile'}</h1>
              <p className="profile-email">{displayUser.email}</p>
              <div className="profile-badges">
                <span className="profile-badge"><IconUser size={14} /> Customer</span>
                <span className="profile-badge"><IconStar size={14} /> 4.8 Rating</span>
              </div>
              <p className="profile-member-since">
                Member since {displayJoinedDate?.toLocaleDateString() || 'Recently'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="profile-stats-container">
        <div className="profile-stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><IconCompass size={26} /></div>
            <div className="stat-value">{displayMembershipDays}</div>
            <div className="stat-label">Days Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><IconList size={26} /></div>
            <div className="stat-value">{displayCustomer?.orders?.length || 0}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><IconTruck size={26} /></div>
            <div className="stat-value">{displayCustomer?.vehicles?.length || 0}</div>
            <div className="stat-label">Vehicles</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><IconMapPin size={26} /></div>
            <div className="stat-value">{displayCustomer?.addresses?.length || 0}</div>
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
            <span className="icon-inline"><IconUser size={16} /></span>
            Overview
          </button>
          <button 
            className={`profile-tab ${activeTab === 'vehicles' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicles')}
          >
            <span className="icon-inline"><IconTruck size={16} /></span>
            Vehicles
          </button>
          <button 
            className={`profile-tab ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            <span className="icon-inline"><IconMapPin size={16} /></span>
            Addresses
          </button>
          <button 
            className={`profile-tab ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <span className="icon-inline"><IconCard size={16} /></span>
            Payments
          </button>
        </div>

        {/* TAB: Overview */}
        {activeTab === 'overview' && (
          <div className="cards-grid">
            <div className="info-card">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-title-icon"><IconUser size={20} /></span>
                  Personal Information
                </div>
                <button className="card-edit-btn" onClick={openProfileModal}>Edit</button>
              </div>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{displayUser.fullName}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email</span>
                  <span className="info-value">{displayUser.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{displayUser.phone || 'Not added'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Member Since</span>
                  <span className="info-value highlight">{displayJoinedDate?.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-title-icon"><IconSpark size={20} /></span>
                  Account Statistics
                </div>
              </div>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-label">Total Orders</span>
                  <span className="info-value highlight">{displayCustomer?.orders?.length || 0}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Rating</span>
                  <span className="info-value highlight"> 4.8 / 5.0</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Account Status</span>
                  <span className="info-value" style={{color: '#d7e6ff'}}>Active</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email Status</span>
                  <span className="info-value" style={{color: '#d7e6ff'}}>Verified</span>
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
                  <span className="card-title-icon"><IconTruck size={20} /></span>
                  My Vehicles
                </div>
              </div>
              
              {(!displayCustomer?.vehicles || displayCustomer.vehicles.length === 0) ? (
                <div className="empty-state">
                  <div className="empty-icon"><IconTruck size={48} /></div>
                  <div className="empty-text">No vehicles added yet</div>
                  <div className="empty-subtext">Add your first vehicle to get started</div>
                </div>
              ) : (
                <div className="items-list">
                  {displayCustomer.vehicles.map(vehicle => (
                    <div key={vehicle.id} className="item-card">
                      <div className="item-header">
                        <div className="item-title">
                          <span className="icon-inline"><IconTruck size={16} /></span> {vehicle.brand} {vehicle.model}
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
                <div className="card-title"><span className="card-title-icon"><IconMapPin size={20} /></span>Saved Addresses</div>
              </div>
              
              {(!displayCustomer?.addresses || displayCustomer.addresses.length === 0) ? (
                <div className="empty-state">
                  <div className="empty-icon"><IconMapPin size={48} /></div>
                  <div className="empty-text">No addresses saved yet</div>
                  <div className="empty-subtext">Add an address for faster checkout</div>
                </div>
              ) : (
                <div className="items-list">
                  {displayCustomer.addresses.map(address => (
                    <div key={address.id} className="item-card">
                      <div className="item-header">
                        <div className="item-title">
                          <span className="icon-inline"><IconMapPin size={16} /></span> {address.label}
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
                <div className="card-title"><span className="card-title-icon"><IconCard size={20} /></span>Payment Methods</div>
              </div>
              
              {(!displayCustomer?.paymentMethods || displayCustomer.paymentMethods.length === 0) ? (
                <div className="empty-state">
                  <div className="empty-icon"><IconCard size={48} /></div>
                  <div className="empty-text">No payment methods added</div>
                  <div className="empty-subtext">Add a payment method for faster checkout</div>
                </div>
              ) : (
                <div className="items-list">
                  {displayCustomer.paymentMethods.map(payment => (
                    <div key={payment.id} className="item-card">
                      <div className="item-header">
                        <div className="item-title">
                          <span className="icon-inline"><IconCard size={16} /></span> {payment.cardName}
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
                           {payment.cardLast4}<br/>
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
              <div className="modal-title"><IconUser size={18} /> Edit Profile</div>
              <button className="modal-close" onClick={() => setShowProfileModal(false)}>Close</button>
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
              <div className="modal-title"><IconTruck size={18} /> {editingVehicle ? 'Edit' : 'Add'} Vehicle</div>
              <button className="modal-close" onClick={() => setShowVehicleModal(false)}>Close</button>
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
              <div className="modal-title"><IconMapPin size={18} /> Add Address</div>
              <button className="modal-close" onClick={() => setShowAddressModal(false)}>Close</button>
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
              <div className="modal-title"><IconCard size={18} /> Add Payment Method</div>
              <button className="modal-close" onClick={() => setShowPaymentModal(false)}>Close</button>
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


