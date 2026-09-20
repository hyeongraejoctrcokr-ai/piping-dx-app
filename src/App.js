import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, FileText, Send, CheckCircle2, AlertTriangle, Layers, ArrowRight, UserCheck, Play } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('demand'); // 'demand', 'supply', 'admin'
  const [pipeSpec, setPipeSpec] = useState({
    size: 'DN100 (4 inch)',
    material: 'SUS304',
    rating: '10K',
    length: '1200',
    quantity: '5'
  });

  // Calculate pricing
  const basePricePerMeter = pipeSpec.material === 'SUS304' ? 180000 : 95000;
  const unitPrice = Math.round((basePricePerMeter * (parseInt(pipeSpec.length) / 1000)) + 45000);
  const maxPrice = unitPrice * parseInt(pipeSpec.quantity);

  // Auction simulation timer
  const [timeLeft, setTimeLeft] = useState(3600);
  const [bids, setBids] = useState([
    { company: '동아배관제작', price: maxPrice * 0.92, time: '12분 전', status: '최저가' },
    { company: '울산플랜트공업', price: maxPrice * 0.95, time: '25분 전', status: '입찰중' },
    { company: '부산정밀스틸', price: maxPrice * 0.98, time: '40분 전', status: '입찰중' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#1E2761', color: 'white', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#F2994A', color: 'white', fontWeight: 'bold', padding: '6px 12px', borderRadius: '6px', fontSize: '20px' }}>
            PIPING DX
          </div>
          <span style={{ fontSize: '14px', opacity: 0.8 }}>플랜트 배관 자동 설계 & 역경매 플랫폼</span>
        </div>
        
        {/* Role Switcher */}
        <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.1)', padding: '4px', borderRadius: '8px' }}>
          <button 
            onClick={() => setActiveTab('demand')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'demand' ? '#F2994A' : 'transparent', color: 'white', fontWeight: 'bold' }}>
            발주사 (설계/견적)
          </button>
          <button 
            onClick={() => setActiveTab('supply')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'supply' ? '#F2994A' : 'transparent', color: 'white', fontWeight: 'bold' }}>
            제작사 (입찰)
          </button>
          <button 
            onClick={() => setActiveTab('admin')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'admin' ? '#F2994A' : 'transparent', color: 'white', fontWeight: 'bold' }}>
            관리자 (이행보장)
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1200px', margin: '32px auto', padding: '0 16px' }}>
        
        {/* Demand View */}
        {activeTab === 'demand' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Left: Input Specifications */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E2761', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={20} color="#F2994A" /> 1단계: 배관 규격 및 수량 선택
              </h2>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>배관경 (Pipe Size)</label>
                  <select 
                    value={pipeSpec.size} 
                    onChange={(e) => setPipeSpec({...pipeSpec, size: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                    <option>DN50 (2 inch)</option>
                    <option>DN80 (3 inch)</option>
                    <option>DN100 (4 inch)</option>
                    <option>DN150 (6 inch)</option>
                    <option>DN200 (8 inch)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>배관 재질 (Material)</label>
                  <select 
                    value={pipeSpec.material} 
                    onChange={(e) => setPipeSpec({...pipeSpec, material: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                    <option value="SUS304">스테인리스 (SUS304)</option>
                    <option value="CS">탄소강 (Carbon Steel)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>압력 등급</label>
                    <input 
                      type="text" 
                      value={pipeSpec.rating}
                      onChange={(e) => setPipeSpec({...pipeSpec, rating: e.target.value})}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>길이 (mm)</label>
                    <input 
                      type="number" 
                      value={pipeSpec.length}
                      onChange={(e) => setPipeSpec({...pipeSpec, length: e.target.value})}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>발주 수량 (개)</label>
                  <input 
                    type="number" 
                    value={pipeSpec.quantity}
                    onChange={(e) => setPipeSpec({...pipeSpec, quantity: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              {/* Price Calculation Box */}
              <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f1f5f9', borderRadius: '8px', borderLeft: '4px solid #F2994A' }}>
                <div style={{ fontSize: '14px', color: '#64748b' }}>자동 산출된 원가 기준 상한가 (Max Budget)</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E2761', marginTop: '4px' }}>
                  {maxPrice.toLocaleString()} 원
                </div>
                <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>
                  ✓ 1시간 역경매를 통해 이보다 낮은 최저가로 낙찰됩니다.
                </div>
              </div>

              <button 
                onClick={() => alert('1시간 역경매 발주가 등록되었습니다!')}
                style={{ marginTop: '20px', width: '100%', padding: '14px', backgroundColor: '#F2994A', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                <Send size={18} /> 1시간 역경매 발주 시작하기
              </button>
            </div>

            {/* Right: 2D Drawing & Auction Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* 2D CAD Preview */}
              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E2761', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} color="#1E2761" /> 실시간 파라메트릭 2D 도면 미리보기
                </h3>
                <div style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '20px', textAlign: 'center', backgroundColor: '#fafafa' }}>
                  <svg width="100%" height="160" viewBox="0 0 400 160">
                    <rect x="50" y="50" width="300" height="60" fill="#e2e8f0" stroke="#1E2761" strokeWidth="3" />
                    <rect x="30" y="35" width="20" height="90" fill="#cbd5e1" stroke="#1E2761" strokeWidth="2" />
                    <rect x="350" y="35" width="20" height="90" fill="#cbd5e1" stroke="#1E2761" strokeWidth="2" />
                    <line x1="50" y1="30" x2="350" y2="30" stroke="#F2994A" strokeWidth="2" strokeDasharray="4" />
                    <text x="200" y="20" textAnchor="middle" fill="#F2994A" fontSize="12" fontWeight="bold">L = {pipeSpec.length} mm</text>
                    <text x="200" y="85" textAnchor="middle" fill="#1E2761" fontSize="14" fontWeight="bold">{pipeSpec.size} ({pipeSpec.material})</text>
                  </svg>
                </div>
              </div>

              {/* Auction Live Box */}
              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E2761', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={18} color="#F2994A" /> 실시간 역경매 진행 현황
                  </h3>
                  <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' }}>
                    남은 시간: {formatTime(timeLeft)}
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '10px' }}>
                  {bids.map((bid, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: idx === 0 ? '#f0fdf4' : '#f8fafc', borderRadius: '8px', border: idx === 0 ? '1px solid #bbf7d0' : '1px solid #e2e8f0' }}>
                      <div>
                        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{bid.company}</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '8px' }}>{bid.time}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold', color: idx === 0 ? '#16a34a' : '#334155' }}>
                          {bid.price.toLocaleString()} 원
                        </div>
                        <span style={{ fontSize: '11px', color: idx === 0 ? '#16a34a' : '#64748b' }}>{bid.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Supply View */}
        {activeTab === 'supply' && (
          <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E2761', marginBottom: '16px' }}>제작사 실시간 입찰 대시보드</h2>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>등록된 발주건을 확인하고 1시간 이내에 최저가 투찰에 참여하세요.</p>
            
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ backgroundColor: '#e0e7ff', color: '#3730a3', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>입찰 진행중</span>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '8px' }}>플랜트 배관 용접 제작건 ({pipeSpec.size}, {pipeSpec.quantity}개)</h3>
                <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>발주사 원가 상한가: {maxPrice.toLocaleString()} 원</div>
              </div>
              <button 
                onClick={() => {
                  const myBid = prompt('투찰 금액을 입력해주세요 (원):', maxPrice * 0.88);
                  if (myBid) alert(`${Number(myBid).toLocaleString()}원으로 입찰 등록이 완료되었습니다!`);
                }}
                style={{ backgroundColor: '#1E2761', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                최저가 투찰하기
              </button>
            </div>
          </div>
        )}

        {/* Admin View */}
        {activeTab === 'admin' && (
          <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E2761', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={24} color="#F2994A" /> PIPING DX 100% 이행 보장 관리자
            </h2>
            <div style={{ padding: '20px', backgroundColor: '#fff7ed', borderRadius: '8px', border: '1px solid #ffedd5', marginBottom: '24px' }}>
              <div style={{ fontWeight: 'bold', color: '#c2410c', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} /> 미낙찰 방지 안전장치 시스템 작동중
              </div>
              <p style={{ fontSize: '14px', color: '#9a3412', marginTop: '6px' }}>
                1시간 동안 외부 제작사 낙찰이 이루어지지 않을 경우, PIPING DX 상시 배치 용접 인력이 자동으로 수주하여 자체 직접 제작을 이행합니다.
              </p>
            </div>
            <button 
              onClick={() => alert('PIPING DX 자체 용접 인력이 즉시 투입되었습니다!')}
              style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              강제 자체 직접 제작 인력 투입 실행
            </button>
          </div>
        )}
      </main>
    </div>
  );
}