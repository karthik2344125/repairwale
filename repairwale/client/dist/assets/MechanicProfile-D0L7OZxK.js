import{a as H,u as L,r as l,j as e}from"./index-BgBzfigI.js";import{a as $}from"./roleData-DJwutZ1G.js";const J=`
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
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  border-color: transparent;
  color: #0b1220;
  transform: translateX(-4px);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.14);
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
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  border-color: transparent;
  color: #0b1220;
  transform: scale(1.12);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.14);
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
}

.profile-email {
  font-size: 16px;
  color: #aaa;
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
  border: 2px solid #4A9EFF;
  color: #4A9EFF;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(74, 158, 255, 0.18);
}

.profile-member-since {
  font-size: 14px;
  color: #aaa;
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
  border: 2px solid #2A4368;
}

.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18), 0 16px 48px rgba(74, 158, 255, 0.1);
  border-color: #4A9EFF;
}

.stat-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 900;
  color: #60a5fa;
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
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  padding: 12px;
  border-radius: 16px;
  border: 2px solid #2A4368;
  overflow-x: auto;
  box-shadow: 0 6px 20px rgba(8, 14, 24, 0.3);
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
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  color: #0b1220;
  border-color: #4A9EFF;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18), 0 6px 20px rgba(74, 158, 255, 0.22);
}

.profile-tab:hover:not(.active) {
  background: #162844;
  color: #E6EDF7;
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
  border: 2px solid #2A4368;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 8px 28px rgba(8, 14, 24, 0.3);
  transition: all 0.3s ease;
}

.info-card:hover {
  border-color: #4A9EFF;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18), 0 12px 40px rgba(74, 158, 255, 0.1);
  transform: translateY(-4px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #4A9EFF;
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
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 2px solid #2A4368;
  color: #4A9EFF;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(8, 14, 24, 0.3);
}

.card-edit-btn:hover {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  border-color: #4A9EFF;
  color: #0b1220;
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18), 0 6px 16px rgba(74, 158, 255, 0.12);
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
  border-bottom: 1px solid #3a4a6a;
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
  color: #E6EDF7;
  font-weight: 600;
  text-align: right;
}

.info-value.highlight {
  color: #4A9EFF;
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
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 2px solid #2A4368;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(8, 14, 24, 0.3);
}

.item-card:hover {
  border-color: #4A9EFF;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18), 0 8px 24px rgba(74, 158, 255, 0.12);
  transform: translateY(-2px);
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
  color: #E6EDF7;
}

.item-badge {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  color: #0b1220;
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
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 1px solid #2A4368;
  color: #4A9EFF;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(8, 14, 24, 0.3);
}

.item-action-btn:hover {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  border-color: #4A9EFF;
  color: #0b1220;
  transform: translateY(-1px);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18), 0 4px 12px rgba(74, 158, 255, 0.18);
}

.item-action-btn.danger {
  color: #ff6b6b;
  border-color: #ff6b6b;
}

.item-action-btn.danger:hover {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
  border-color: #ff6b6b;
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
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  border: 2px solid #4A9EFF;
  color: #ffffff;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18), 0 6px 20px rgba(74, 158, 255, 0.18);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-item-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18), 0 12px 32px rgba(74, 158, 255, 0.28);
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
  color: #E6EDF7;
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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 2px solid #2A4368;
  border-radius: 16px;
  padding: 28px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(8, 14, 24, 0.4);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #4A9EFF;
}

.modal-title {
  font-size: 20px;
  font-weight: 800;
  color: #E6EDF7;
}

.modal-close {
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 2px solid #ff6b6b;
  color: #ff6b6b;
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
  background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
  border-color: #ff6b6b;
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
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 2px solid #2A4368;
  color: #E6EDF7;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #4A9EFF;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18), 0 0 0 3px rgba(74, 158, 255, 0.12);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn-cancel {
  flex: 1;
  padding: 14px 20px;
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 2px solid #2A4368;
  color: #4A9EFF;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel:hover {
  background: #162844;
  border-color: #4A9EFF;
  box-shadow: 0 4px 12px rgba(74, 158, 255, 0.1);
}

.btn-save {
  flex: 1;
  padding: 14px 20px;
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  border: 2px solid #4A9EFF;
  color: #ffffff;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18), 0 6px 20px rgba(74, 158, 255, 0.18);
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.18), 0 10px 28px rgba(74, 158, 255, 0.1);
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
  background: linear-gradient(180deg, #0B1220 0%, #0F1728 100%) !important;
}

.profile-hero {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), 0 0 100px rgba(74, 158, 255, 0.05) !important;
  border-bottom: 1px solid rgba(74, 158, 255, 0.1);
}

.profile-name,
.card-title,
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

.info-card {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.4);
  position: relative;
}

.info-card::after {
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

.info-card:hover::after {
  opacity: 0.15;
}

.info-card:hover {
  box-shadow: 0 12px 40px rgba(74, 158, 255, 0.12);
}

.service-item {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
}

.service-item:hover {
  border-color: #4A9EFF !important;
  box-shadow: 0 4px 16px rgba(74, 158, 255, 0.12);
}

.service-name {
  color: #E6EDF7 !important;
}

.service-rate {
  color: #4A9EFF !important;
  font-weight: 800;
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

.btn-save,
.add-service-btn {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
  color: #FFFFFF !important;
  border: 2px solid #4A9EFF !important;
  box-shadow: 0 6px 20px rgba(74, 158, 255, 0.22);
  font-weight: 800;
}

.btn-save:hover,
.add-service-btn:hover {
  background: linear-gradient(135deg, #60A5FF 0%, #80B8FF 100%) !important;
  box-shadow: 0 12px 32px rgba(74, 158, 255, 0.28);
  transform: translateY(-4px);
}

.service-actions .btn,
.edit-pricing-btn {
  background: linear-gradient(135deg, #1A3A5C 0%, #2A4368 100%) !important;
  border: 2px solid #4A9EFF !important;
  color: #4A9EFF !important;
  transition: all 0.2s;
}

.service-actions .btn:hover,
.edit-pricing-btn:hover {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
  color: #FFFFFF !important;
  box-shadow: 0 6px 20px rgba(74, 158, 255, 0.22);
  transform: translateY(-2px);
}

.service-actions .btn.danger {
  background: linear-gradient(135deg, #3D1A1A 0%, #5C2A2A 100%) !important;
  color: #FF6B6B !important;
  border-color: #FF6B6B !important;
}

.service-actions .btn.danger:hover {
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

.modal-overlay {
  background: rgba(11, 18, 32, 0.85) !important;
  backdrop-filter: blur(8px);
}

@keyframes profile-float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(10px, 10px); }
  50% { transform: translate(0, 20px); }
  75% { transform: translate(-10px, 10px); }
}
`;function W(){var u,N,j,F,w,A,y,E;const{user:i,completeLogout:k}=H(),v=L(),[o,d]=l.useState("overview"),[a,S]=l.useState(null),[C,c]=l.useState(!1),[z,p]=l.useState(!1),[T,x]=l.useState(!1),[s,b]=l.useState({fullName:"",phone:"",email:"",specialization:""}),[n,f]=l.useState({name:"",rate:""}),[t,g]=l.useState({startTime:"",endTime:"",serviceArea:""}),[U,V]=l.useState(null);l.useEffect(()=>{const r=$();S(r)},[]);const D=((i==null?void 0:i.fullName)||"User").split(" ").map(r=>r[0]).join("").slice(0,2).toUpperCase(),m=i!=null&&i.joinedDate?new Date(i.joinedDate):null;m&&Math.max(0,Math.floor((Date.now()-m.getTime())/(1e3*60*60*24)));const B=()=>{confirm("Are you sure you want to logout?")&&(k(),v("/"))},P=()=>{b({fullName:(i==null?void 0:i.fullName)||"",phone:(i==null?void 0:i.phone)||"",email:(i==null?void 0:i.email)||"",specialization:(i==null?void 0:i.specialization)||""}),c(!0)},M=()=>{if(!s.fullName.trim()){alert("Please enter your full name");return}const r={...i,fullName:s.fullName,phone:s.phone,specialization:s.specialization};localStorage.setItem("repairwale_user",JSON.stringify(r)),c(!1),window.location.reload()},R=()=>{if(!n.name.trim()||!n.rate.trim()){alert("Please fill all service details");return}const r={...n,id:Date.now()},h={...a,services:[...(a==null?void 0:a.services)||[],r]};localStorage.setItem("repairwale_mechanic",JSON.stringify(h)),f({name:"",rate:""}),p(!1),window.location.reload()},O=r=>{if(!confirm("Are you sure you want to remove this service?"))return;const h={...a,services:a.services.filter(I=>I.id!==r)};localStorage.setItem("repairwale_mechanic",JSON.stringify(h)),window.location.reload()},Y=()=>{if(!t.startTime||!t.endTime||!t.serviceArea){alert("Please fill all availability details");return}const r={...a,availability:t};localStorage.setItem("repairwale_mechanic",JSON.stringify(r)),x(!1),window.location.reload()};return e.jsxs("div",{className:"profile-wrapper",children:[e.jsx("style",{children:J}),e.jsx("div",{className:"profile-hero",children:e.jsxs("div",{className:"profile-hero-content",children:[e.jsxs("div",{className:"profile-top-nav",children:[e.jsx("button",{className:"back-btn",onClick:()=>v("/mechanic/home"),children:"← Back to Dashboard"}),e.jsx("div",{className:"profile-actions",children:e.jsx("button",{className:"action-icon-btn",onClick:B,title:"Logout",children:"🚪"})})]}),e.jsxs("div",{className:"profile-header-main",children:[e.jsxs("div",{className:"profile-avatar-wrapper",children:[e.jsx("div",{className:"profile-avatar-large",children:D}),e.jsx("div",{className:"profile-status-badge",children:"Online"})]}),e.jsxs("div",{className:"profile-info",children:[e.jsx("h1",{className:"profile-name",children:(i==null?void 0:i.fullName)||"Mechanic"}),e.jsx("p",{className:"profile-email",children:i==null?void 0:i.email}),e.jsxs("div",{className:"profile-badges",children:[e.jsxs("span",{className:"profile-badge",children:["⭐ ",((u=a==null?void 0:a.rating)==null?void 0:u.toFixed(1))||"4.5"," / 5.0"]}),e.jsx("span",{className:"profile-badge",children:"✓ Verified"})]}),e.jsxs("p",{className:"profile-member-since",children:["Member since ",m==null?void 0:m.toLocaleDateString()]})]})]})]})}),e.jsx("div",{className:"profile-stats-container",children:e.jsxs("div",{className:"profile-stats-grid",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"⭐"}),e.jsx("div",{className:"stat-value",children:((N=a==null?void 0:a.rating)==null?void 0:N.toFixed(1))||"4.5"}),e.jsx("div",{className:"stat-label",children:"Rating"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"📋"}),e.jsx("div",{className:"stat-value",children:(a==null?void 0:a.servicesCompleted)||0}),e.jsx("div",{className:"stat-label",children:"Services Done"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"🔧"}),e.jsx("div",{className:"stat-value",children:((j=a==null?void 0:a.services)==null?void 0:j.length)||0}),e.jsx("div",{className:"stat-label",children:"Services Offered"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"💰"}),e.jsxs("div",{className:"stat-value",children:["₹",(a==null?void 0:a.totalEarnings)||0]}),e.jsx("div",{className:"stat-label",children:"Total Earnings"})]})]})}),e.jsxs("div",{className:"profile-content",children:[e.jsxs("div",{className:"profile-tabs",children:[e.jsxs("button",{className:`profile-tab ${o==="overview"?"active":""}`,onClick:()=>d("overview"),children:[e.jsx("span",{children:"📊"})," Overview"]}),e.jsxs("button",{className:`profile-tab ${o==="services"?"active":""}`,onClick:()=>d("services"),children:[e.jsx("span",{children:"🔧"})," Services"]}),e.jsxs("button",{className:`profile-tab ${o==="availability"?"active":""}`,onClick:()=>d("availability"),children:[e.jsx("span",{children:"📅"})," Availability"]}),e.jsxs("button",{className:`profile-tab ${o==="reviews"?"active":""}`,onClick:()=>d("reviews"),children:[e.jsx("span",{children:"⭐"})," Reviews"]}),e.jsxs("button",{className:`profile-tab ${o==="earnings"?"active":""}`,onClick:()=>d("earnings"),children:[e.jsx("span",{children:"💰"})," Earnings"]})]}),o==="overview"&&e.jsxs("div",{className:"cards-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsxs("div",{className:"card-header",children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"👤"}),"Personal Information"]}),e.jsx("button",{className:"card-edit-btn",onClick:P,children:"Edit"})]}),e.jsxs("div",{className:"info-rows",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Full Name"}),e.jsx("span",{className:"info-value",children:i==null?void 0:i.fullName})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Email"}),e.jsx("span",{className:"info-value",children:i==null?void 0:i.email})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Phone"}),e.jsx("span",{className:"info-value",children:(i==null?void 0:i.phone)||"Not added"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Specialization"}),e.jsx("span",{className:"info-value highlight",children:(i==null?void 0:i.specialization)||"General"})]})]})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"📊"}),"Performance"]})}),e.jsxs("div",{className:"info-rows",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Total Services"}),e.jsx("span",{className:"info-value highlight",children:(a==null?void 0:a.servicesCompleted)||0})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Average Rating"}),e.jsxs("span",{className:"info-value highlight",children:["⭐ ",((F=a==null?void 0:a.rating)==null?void 0:F.toFixed(1))||"4.5"," / 5.0"]})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Account Status"}),e.jsx("span",{className:"info-value",style:{color:"#10b981"},children:"🟢 Active"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Verification"}),e.jsx("span",{className:"info-value",style:{color:"#10b981"},children:"✓ Verified"})]})]})]})]}),o==="services"&&e.jsx("div",{className:"cards-grid",children:e.jsxs("div",{className:"info-card",style:{gridColumn:"1 / -1"},children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"🔧"}),"My Services"]})}),!(a!=null&&a.services)||a.services.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:"🔧"}),e.jsx("div",{className:"empty-text",children:"No services added yet"}),e.jsx("div",{className:"empty-subtext",children:"Add your services to start accepting requests"})]}):e.jsx("div",{className:"items-list",children:a.services.map(r=>e.jsxs("div",{className:"item-card",children:[e.jsxs("div",{className:"item-header",children:[e.jsxs("div",{className:"item-title",children:["🔧 ",r.name]}),e.jsx("div",{className:"item-actions",children:e.jsx("button",{className:"item-action-btn",onClick:()=>O(r.id),children:"Remove"})})]}),e.jsxs("div",{className:"item-details",children:["Rate: ₹",r.rate," per service"]})]},r.id))}),e.jsx("button",{className:"add-item-btn",onClick:()=>p(!0),children:"+ Add New Service"})]})}),o==="availability"&&e.jsxs("div",{className:"cards-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsxs("div",{className:"card-header",children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"📅"}),"Working Hours"]}),e.jsx("button",{className:"card-edit-btn",onClick:()=>{g((a==null?void 0:a.availability)||{startTime:"",endTime:"",serviceArea:""}),x(!0)},children:"Edit"})]}),e.jsxs("div",{className:"info-rows",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Start Time"}),e.jsx("span",{className:"info-value",children:((w=a==null?void 0:a.availability)==null?void 0:w.startTime)||"Not set"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"End Time"}),e.jsx("span",{className:"info-value",children:((A=a==null?void 0:a.availability)==null?void 0:A.endTime)||"Not set"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Service Area"}),e.jsx("span",{className:"info-value",children:((y=a==null?void 0:a.availability)==null?void 0:y.serviceArea)||"Not set"})]})]})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"📍"}),"Service Coverage"]})}),e.jsxs("div",{className:"info-rows",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Primary Area"}),e.jsx("span",{className:"info-value highlight",children:((E=a==null?void 0:a.availability)==null?void 0:E.serviceArea)||"Not configured"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Flexibility"}),e.jsx("span",{className:"info-value",children:"High"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Coverage Radius"}),e.jsx("span",{className:"info-value",children:"10 km"})]})]})]})]}),o==="reviews"&&e.jsx("div",{className:"cards-grid",children:e.jsxs("div",{className:"info-card",style:{gridColumn:"1 / -1"},children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"⭐"}),"Customer Reviews"]})}),!(a!=null&&a.reviews)||a.reviews.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:"⭐"}),e.jsx("div",{className:"empty-text",children:"No reviews yet"}),e.jsx("div",{className:"empty-subtext",children:"Your reviews will appear here as customers rate your services"})]}):e.jsx("div",{className:"items-list",children:a.reviews.map(r=>e.jsxs("div",{className:"item-card",children:[e.jsx("div",{className:"item-header",children:e.jsxs("div",{className:"item-title",children:["⭐ ",r.rating," / 5.0 - ",r.customerName]})}),e.jsxs("div",{className:"item-details",children:['"',r.comment,'"']})]},r.id))})]})}),o==="earnings"&&e.jsxs("div",{className:"cards-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"💰"}),"Income Summary"]})}),e.jsxs("div",{className:"info-rows",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Total Earnings"}),e.jsxs("span",{className:"info-value highlight",children:["₹",(a==null?void 0:a.totalEarnings)||0]})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"This Month"}),e.jsxs("span",{className:"info-value",children:["₹",(a==null?void 0:a.monthlyEarnings)||0]})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Pending Amount"}),e.jsxs("span",{className:"info-value",style:{color:"#ffa726"},children:["₹",(a==null?void 0:a.pendingAmount)||0]})]})]})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"card-title-icon",children:"📈"}),"Statistics"]})}),e.jsxs("div",{className:"info-rows",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Services This Month"}),e.jsx("span",{className:"info-value",children:(a==null?void 0:a.servicesThisMonth)||0})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Average Per Service"}),e.jsxs("span",{className:"info-value",children:["₹",(a==null?void 0:a.avgPerService)||0]})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Payment Status"}),e.jsx("span",{className:"info-value",style:{color:"#10b981"},children:"Active"})]})]})]})]})]}),C&&e.jsx("div",{className:"modal-overlay",onClick:()=>c(!1),children:e.jsxs("div",{className:"modal-content",onClick:r=>r.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"modal-title",children:"👤 Edit Profile"}),e.jsx("button",{className:"modal-close",onClick:()=>c(!1),children:"×"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Full Name"}),e.jsx("input",{type:"text",className:"form-input",value:s.fullName,onChange:r=>b({...s,fullName:r.target.value}),placeholder:"Your full name"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Email"}),e.jsx("input",{type:"email",className:"form-input",value:s.email,placeholder:"Your email",disabled:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Phone"}),e.jsx("input",{type:"tel",className:"form-input",value:s.phone,onChange:r=>b({...s,phone:r.target.value}),placeholder:"Your phone number"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Specialization"}),e.jsx("input",{type:"text",className:"form-input",value:s.specialization,onChange:r=>b({...s,specialization:r.target.value}),placeholder:"e.g., Engine, Transmission, Brakes"})]}),e.jsxs("div",{className:"form-actions",children:[e.jsx("button",{className:"btn-cancel",onClick:()=>c(!1),children:"Cancel"}),e.jsx("button",{className:"btn-save",onClick:M,children:"Save Profile"})]})]})}),z&&e.jsx("div",{className:"modal-overlay",onClick:()=>p(!1),children:e.jsxs("div",{className:"modal-content",onClick:r=>r.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"modal-title",children:"🔧 Add Service"}),e.jsx("button",{className:"modal-close",onClick:()=>p(!1),children:"×"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Service Name"}),e.jsx("input",{type:"text",className:"form-input",value:n.name,onChange:r=>f({...n,name:r.target.value}),placeholder:"e.g., Engine Oil Change"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Service Rate (₹)"}),e.jsx("input",{type:"number",className:"form-input",value:n.rate,onChange:r=>f({...n,rate:r.target.value}),placeholder:"500"})]}),e.jsxs("div",{className:"form-actions",children:[e.jsx("button",{className:"btn-cancel",onClick:()=>p(!1),children:"Cancel"}),e.jsx("button",{className:"btn-save",onClick:R,children:"Add Service"})]})]})}),T&&e.jsx("div",{className:"modal-overlay",onClick:()=>x(!1),children:e.jsxs("div",{className:"modal-content",onClick:r=>r.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"modal-title",children:"📅 Update Availability"}),e.jsx("button",{className:"modal-close",onClick:()=>x(!1),children:"×"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Start Time"}),e.jsx("input",{type:"time",className:"form-input",value:t.startTime,onChange:r=>g({...t,startTime:r.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"End Time"}),e.jsx("input",{type:"time",className:"form-input",value:t.endTime,onChange:r=>g({...t,endTime:r.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Service Area"}),e.jsx("input",{type:"text",className:"form-input",value:t.serviceArea,onChange:r=>g({...t,serviceArea:r.target.value}),placeholder:"e.g., North Delhi"})]}),e.jsxs("div",{className:"form-actions",children:[e.jsx("button",{className:"btn-cancel",onClick:()=>x(!1),children:"Cancel"}),e.jsx("button",{className:"btn-save",onClick:Y,children:"Save Availability"})]})]})})]})}export{W as default};
