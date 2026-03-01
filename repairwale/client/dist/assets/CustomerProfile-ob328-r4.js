import{a as Q,u as Z,r as n,j as e}from"./index-BgBzfigI.js";import{g as ee,s as p}from"./roleData-DJwutZ1G.js";const ae=`
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
`;function oe(){var C,M,S,D;const{user:t,completeLogout:z}=Q(),y=Z(),[m,F]=n.useState("overview"),[r,d]=n.useState(null),[P,u]=n.useState(!1),[B,v]=n.useState(!1),[Y,N]=n.useState(!1),[V,j]=n.useState(!1),[x,w]=n.useState({fullName:"",phone:"",email:""}),[c,h]=n.useState({brand:"",model:"",plate:""}),[l,f]=n.useState({label:"",line:"",city:"",pincode:""}),[i,g]=n.useState({cardName:"",cardNumber:"",expiryMonth:"",expiryYear:"",cvv:""}),[k,A]=n.useState(null);n.useEffect(()=>{const a=ee();d(a)},[]);const R=((t==null?void 0:t.fullName)||"User").split(" ").map(a=>a[0]).join("").slice(0,2).toUpperCase(),b=t!=null&&t.joinedDate?new Date(t.joinedDate):null,T=b?Math.max(0,Math.floor((Date.now()-b.getTime())/(1e3*60*60*24))):0,L=()=>{confirm("Are you sure you want to logout?")&&(z(),y("/"))},H=()=>{w({fullName:(t==null?void 0:t.fullName)||"",phone:(t==null?void 0:t.phone)||"",email:(t==null?void 0:t.email)||""}),u(!0)},I=()=>{if(!x.fullName.trim()){alert("Please enter your full name");return}const a={...t,fullName:x.fullName,phone:x.phone};localStorage.setItem("repairwale_user",JSON.stringify(a)),u(!1),window.location.reload()},E=(a=null)=>{a?(h({brand:a.brand,model:a.model,plate:a.plate}),A(a.id)):(h({brand:"",model:"",plate:""}),A(null)),v(!0)},O=()=>{if(!c.brand.trim()||!c.model.trim()){alert("Please enter vehicle brand and model");return}if(!r){alert("Customer data not loaded");return}if(k){const a={...r,vehicles:(r.vehicles||[]).map(o=>o.id===k?{...o,...c}:o)};d(a),p(a)}else{const a=r.vehicles||[],o={id:`VH-${Date.now()}`,...c,primary:a.length===0},s={...r,vehicles:[...a,o]};d(s),p(s)}v(!1),h({brand:"",model:"",plate:""}),A(null)},$=a=>{if(!r||!confirm("Remove this vehicle?"))return;const o={...r,vehicles:(r.vehicles||[]).filter(s=>s.id!==a)};d(o),p(o)},U=a=>{if(!r)return;const o={...r,vehicles:(r.vehicles||[]).map(s=>({...s,primary:s.id===a}))};d(o),p(o)},G=()=>{f({label:"",line:"",city:"",pincode:""}),N(!0)},J=()=>{if(!l.label.trim()||!l.line.trim()){alert("Please enter address label and line");return}if(!r){alert("Customer data not loaded");return}const a={id:`ADDR-${Date.now()}`,...l},o={...r,addresses:[...r.addresses||[],a]};d(o),p(o),N(!1),f({label:"",line:"",city:"",pincode:""})},K=a=>{if(!r||!confirm("Remove this address?"))return;const o={...r,addresses:(r.addresses||[]).filter(s=>s.id!==a)};d(o),p(o)},W=()=>{g({cardName:"",cardNumber:"",expiryMonth:"",expiryYear:"",cvv:""}),j(!0)},X=()=>{if(!i.cardName.trim()||!i.cardNumber.trim()||!i.expiryMonth||!i.expiryYear||!i.cvv){alert("Please fill in all payment details");return}if(!r){alert("Customer data not loaded");return}const a={id:`PM-${Date.now()}`,cardName:i.cardName,cardLast4:i.cardNumber.slice(-4),expiryMonth:i.expiryMonth,expiryYear:i.expiryYear,isDefault:!r.paymentMethods||r.paymentMethods.length===0},o={...r,paymentMethods:[...r.paymentMethods||[],a]};d(o),p(o),j(!1),g({cardName:"",cardNumber:"",expiryMonth:"",expiryYear:"",cvv:""})},_=a=>{if(!r||!confirm("Remove this payment method?"))return;const o={...r,paymentMethods:(r.paymentMethods||[]).filter(s=>s.id!==a)};d(o),p(o)},q=a=>{if(!r)return;const o={...r,paymentMethods:(r.paymentMethods||[]).map(s=>({...s,isDefault:s.id===a}))};d(o),p(o)};return e.jsxs("div",{className:"profile-wrapper",children:[e.jsx("style",{children:ae}),e.jsx("div",{className:"profile-hero",children:e.jsxs("div",{className:"profile-hero-content",children:[e.jsxs("div",{className:"profile-top-nav",children:[e.jsx("button",{className:"back-btn",onClick:()=>y("/customer"),children:"← Back to Home"}),e.jsxs("div",{className:"profile-actions",children:[e.jsx("button",{className:"action-icon-btn",onClick:()=>y("/favorites"),title:"Favorites",children:"❤"}),e.jsx("button",{className:"action-icon-btn",onClick:L,title:"Logout",children:"⎋"})]})]}),e.jsxs("div",{className:"profile-header-main",children:[e.jsxs("div",{className:"profile-avatar-wrapper",children:[e.jsx("div",{className:"profile-avatar-large",children:R}),e.jsx("div",{className:"profile-status-badge",children:"Verified"})]}),e.jsxs("div",{className:"profile-info",children:[e.jsx("h1",{className:"profile-name",children:(t==null?void 0:t.fullName)||"My Profile"}),e.jsx("p",{className:"profile-email",children:t==null?void 0:t.email}),e.jsxs("div",{className:"profile-badges",children:[e.jsx("span",{className:"profile-badge",children:"Customer"}),e.jsx("span",{className:"profile-badge",children:"4.8 Rating"})]}),e.jsxs("p",{className:"profile-member-since",children:["Member since ",(b==null?void 0:b.toLocaleDateString())||"Recently"]})]})]})]})}),e.jsx("div",{className:"profile-stats-container",children:e.jsxs("div",{className:"profile-stats-grid",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"📅"}),e.jsx("div",{className:"stat-value",children:T}),e.jsx("div",{className:"stat-label",children:"Days Active"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"📦"}),e.jsx("div",{className:"stat-value",children:((C=r==null?void 0:r.orders)==null?void 0:C.length)||0}),e.jsx("div",{className:"stat-label",children:"Total Orders"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"🚗"}),e.jsx("div",{className:"stat-value",children:((M=r==null?void 0:r.vehicles)==null?void 0:M.length)||0}),e.jsx("div",{className:"stat-label",children:"Vehicles"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"📍"}),e.jsx("div",{className:"stat-value",children:((S=r==null?void 0:r.addresses)==null?void 0:S.length)||0}),e.jsx("div",{className:"stat-label",children:"Addresses"})]})]})}),e.jsxs("div",{className:"profile-content",children:[e.jsxs("div",{className:"profile-tabs",children:[e.jsxs("button",{className:`profile-tab ${m==="overview"?"active":""}`,onClick:()=>F("overview"),children:[e.jsx("span",{children:"📊"})," Overview"]}),e.jsxs("button",{className:`profile-tab ${m==="vehicles"?"active":""}`,onClick:()=>F("vehicles"),children:[e.jsx("span",{children:"🚗"})," Vehicles"]}),e.jsxs("button",{className:`profile-tab ${m==="addresses"?"active":""}`,onClick:()=>F("addresses"),children:[e.jsx("span",{children:"📍"})," Addresses"]}),e.jsxs("button",{className:`profile-tab ${m==="payments"?"active":""}`,onClick:()=>F("payments"),children:[e.jsx("span",{children:"💳"})," Payments"]})]}),m==="overview"&&e.jsxs("div",{className:"cards-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsxs("div",{className:"card-header",children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"👤"}),"Personal Information"]}),e.jsx("button",{className:"card-edit-btn",onClick:H,children:"Edit"})]}),e.jsxs("div",{className:"info-rows",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Full Name"}),e.jsx("span",{className:"info-value",children:t==null?void 0:t.fullName})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Email"}),e.jsx("span",{className:"info-value",children:t==null?void 0:t.email})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Phone"}),e.jsx("span",{className:"info-value",children:(t==null?void 0:t.phone)||"Not added"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Member Since"}),e.jsx("span",{className:"info-value highlight",children:b==null?void 0:b.toLocaleDateString()})]})]})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"📊"}),"Account Statistics"]})}),e.jsxs("div",{className:"info-rows",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Total Orders"}),e.jsx("span",{className:"info-value highlight",children:((D=r==null?void 0:r.orders)==null?void 0:D.length)||0})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Rating"}),e.jsx("span",{className:"info-value highlight",children:"⭐ 4.8 / 5.0"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Account Status"}),e.jsx("span",{className:"info-value",style:{color:"#E6EDF7"},children:"Active"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Email Status"}),e.jsx("span",{className:"info-value",style:{color:"#E6EDF7"},children:"Verified"})]})]})]})]}),m==="vehicles"&&e.jsx("div",{className:"cards-grid",children:e.jsxs("div",{className:"info-card",style:{gridColumn:"1 / -1"},children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"🚗"}),"My Vehicles"]})}),!(r!=null&&r.vehicles)||r.vehicles.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:"🚗"}),e.jsx("div",{className:"empty-text",children:"No vehicles added yet"}),e.jsx("div",{className:"empty-subtext",children:"Add your first vehicle to get started"})]}):e.jsx("div",{className:"items-list",children:r.vehicles.map(a=>e.jsxs("div",{className:"item-card",children:[e.jsxs("div",{className:"item-header",children:[e.jsxs("div",{className:"item-title",children:["🚗 ",a.brand," ",a.model,a.primary&&e.jsx("span",{className:"item-badge",children:"Primary"})]}),e.jsxs("div",{className:"item-actions",children:[!a.primary&&e.jsx("button",{className:"item-action-btn",onClick:()=>U(a.id),children:"Set Primary"}),e.jsx("button",{className:"item-action-btn",onClick:()=>E(a),children:"Edit"}),e.jsx("button",{className:"item-action-btn danger",onClick:()=>$(a.id),children:"Remove"})]})]}),e.jsxs("div",{className:"item-details",children:["Plate: ",a.plate||"Not specified"]})]},a.id))}),e.jsx("button",{className:"add-item-btn",onClick:()=>E(),children:"+ Add New Vehicle"})]})}),m==="addresses"&&e.jsx("div",{className:"cards-grid",children:e.jsxs("div",{className:"info-card",style:{gridColumn:"1 / -1"},children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"📍"}),"Saved Addresses"]})}),!(r!=null&&r.addresses)||r.addresses.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:"📍"}),e.jsx("div",{className:"empty-text",children:"No addresses saved yet"}),e.jsx("div",{className:"empty-subtext",children:"Add an address for faster checkout"})]}):e.jsx("div",{className:"items-list",children:r.addresses.map(a=>e.jsxs("div",{className:"item-card",children:[e.jsxs("div",{className:"item-header",children:[e.jsxs("div",{className:"item-title",children:["📍 ",a.label]}),e.jsx("div",{className:"item-actions",children:e.jsx("button",{className:"item-action-btn danger",onClick:()=>K(a.id),children:"Remove"})})]}),e.jsxs("div",{className:"item-details",children:[a.line,e.jsx("br",{}),a.city," - ",a.pincode]})]},a.id))}),e.jsx("button",{className:"add-item-btn",onClick:G,children:"+ Add New Address"})]})}),m==="payments"&&e.jsx("div",{className:"cards-grid",children:e.jsxs("div",{className:"info-card",style:{gridColumn:"1 / -1"},children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"💳"}),"Payment Methods"]})}),!(r!=null&&r.paymentMethods)||r.paymentMethods.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:"💳"}),e.jsx("div",{className:"empty-text",children:"No payment methods added"}),e.jsx("div",{className:"empty-subtext",children:"Add a payment method for faster checkout"})]}):e.jsx("div",{className:"items-list",children:r.paymentMethods.map(a=>e.jsxs("div",{className:"item-card",children:[e.jsxs("div",{className:"item-header",children:[e.jsxs("div",{className:"item-title",children:["💳 ",a.cardName,a.isDefault&&e.jsx("span",{className:"item-badge",children:"Default"})]}),e.jsxs("div",{className:"item-actions",children:[!a.isDefault&&e.jsx("button",{className:"item-action-btn",onClick:()=>q(a.id),children:"Set Default"}),e.jsx("button",{className:"item-action-btn danger",onClick:()=>_(a.id),children:"Remove"})]})]}),e.jsxs("div",{className:"item-details",children:["•••• •••• •••• ",a.cardLast4,e.jsx("br",{}),"Expires: ",a.expiryMonth,"/",a.expiryYear]})]},a.id))}),e.jsx("button",{className:"add-item-btn",onClick:W,children:"+ Add Payment Method"})]})})]}),P&&e.jsx("div",{className:"modal-overlay",onClick:()=>u(!1),children:e.jsxs("div",{className:"modal-content",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"modal-title",children:"✏️ Edit Profile"}),e.jsx("button",{className:"modal-close",onClick:()=>u(!1),children:"×"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Full Name"}),e.jsx("input",{type:"text",className:"form-input",value:x.fullName,onChange:a=>w({...x,fullName:a.target.value}),placeholder:"Enter your full name"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Phone Number"}),e.jsx("input",{type:"tel",className:"form-input",value:x.phone,onChange:a=>w({...x,phone:a.target.value}),placeholder:"Enter your phone number"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Email (Read-only)"}),e.jsx("input",{type:"email",className:"form-input",value:x.email,disabled:!0,style:{opacity:.6}})]}),e.jsxs("div",{className:"form-actions",children:[e.jsx("button",{className:"btn-cancel",onClick:()=>u(!1),children:"Cancel"}),e.jsx("button",{className:"btn-save",onClick:I,children:"Save Changes"})]})]})}),B&&e.jsx("div",{className:"modal-overlay",onClick:()=>v(!1),children:e.jsxs("div",{className:"modal-content",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"modal-title",children:["🚗 ",k?"Edit":"Add"," Vehicle"]}),e.jsx("button",{className:"modal-close",onClick:()=>v(!1),children:"×"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Brand"}),e.jsx("input",{type:"text",className:"form-input",value:c.brand,onChange:a=>h({...c,brand:a.target.value}),placeholder:"e.g., Toyota, Honda"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Model"}),e.jsx("input",{type:"text",className:"form-input",value:c.model,onChange:a=>h({...c,model:a.target.value}),placeholder:"e.g., Camry, Civic"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"License Plate"}),e.jsx("input",{type:"text",className:"form-input",value:c.plate,onChange:a=>h({...c,plate:a.target.value}),placeholder:"e.g., ABC 1234"})]}),e.jsxs("div",{className:"form-actions",children:[e.jsx("button",{className:"btn-cancel",onClick:()=>v(!1),children:"Cancel"}),e.jsx("button",{className:"btn-save",onClick:O,children:"Save Vehicle"})]})]})}),Y&&e.jsx("div",{className:"modal-overlay",onClick:()=>N(!1),children:e.jsxs("div",{className:"modal-content",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"modal-title",children:"📍 Add Address"}),e.jsx("button",{className:"modal-close",onClick:()=>N(!1),children:"×"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Label"}),e.jsx("input",{type:"text",className:"form-input",value:l.label,onChange:a=>f({...l,label:a.target.value}),placeholder:"e.g., Home, Office"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Address Line"}),e.jsx("input",{type:"text",className:"form-input",value:l.line,onChange:a=>f({...l,line:a.target.value}),placeholder:"Street address"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"City"}),e.jsx("input",{type:"text",className:"form-input",value:l.city,onChange:a=>f({...l,city:a.target.value}),placeholder:"City name"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Pincode"}),e.jsx("input",{type:"text",className:"form-input",value:l.pincode,onChange:a=>f({...l,pincode:a.target.value}),placeholder:"6-digit pincode"})]}),e.jsxs("div",{className:"form-actions",children:[e.jsx("button",{className:"btn-cancel",onClick:()=>N(!1),children:"Cancel"}),e.jsx("button",{className:"btn-save",onClick:J,children:"Save Address"})]})]})}),V&&e.jsx("div",{className:"modal-overlay",onClick:()=>j(!1),children:e.jsxs("div",{className:"modal-content",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"modal-title",children:"💳 Add Payment Method"}),e.jsx("button",{className:"modal-close",onClick:()=>j(!1),children:"×"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Cardholder Name"}),e.jsx("input",{type:"text",className:"form-input",value:i.cardName,onChange:a=>g({...i,cardName:a.target.value}),placeholder:"Name on card"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Card Number"}),e.jsx("input",{type:"text",className:"form-input",value:i.cardNumber,onChange:a=>g({...i,cardNumber:a.target.value}),placeholder:"16-digit card number",maxLength:"16"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px"},children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Month"}),e.jsx("input",{type:"text",className:"form-input",value:i.expiryMonth,onChange:a=>g({...i,expiryMonth:a.target.value}),placeholder:"MM",maxLength:"2"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Year"}),e.jsx("input",{type:"text",className:"form-input",value:i.expiryYear,onChange:a=>g({...i,expiryYear:a.target.value}),placeholder:"YY",maxLength:"2"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"CVV"}),e.jsx("input",{type:"text",className:"form-input",value:i.cvv,onChange:a=>g({...i,cvv:a.target.value}),placeholder:"CVV",maxLength:"4"})]})]}),e.jsxs("div",{className:"form-actions",children:[e.jsx("button",{className:"btn-cancel",onClick:()=>j(!1),children:"Cancel"}),e.jsx("button",{className:"btn-save",onClick:X,children:"Save Payment"})]})]})})]})}export{oe as default};
