// pages/SoilAnalysis.js
import React, { useState } from 'react';
import { FaSeedling, FaCheckCircle, FaLeaf } from 'react-icons/fa';

const SoilAnalysis = () => {
  const [selectedSoilType, setSelectedSoilType] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const soilTypes = [
    {
      id: 'sandy',
      name: 'تربة رملية',
      description: 'حبيبات كبيرة، تصريف مائي سريع'
    },
    {
      id: 'clay',
      name: 'تربة طينية',
      description: 'حبيبات دقيقة، تحتفظ بالماء'
    },
    {
      id: 'loamy',
      name: 'تربة طميية',
      description: 'مزيج متوازن، أفضل للزراعة'
    },
    {
      id: 'silty',
      name: 'تربة سلتية',
      description: 'حبيبات متوسطة، خصبة'
    }
  ];

  const soilRecommendations = {
    'sandy': {
      plants: ['البطاطس', 'الفول السوداني', 'الجزر', 'البطيخ', 'الطماطم'],
      fertilizers: ['سماد نيتروجيني بانتظام', 'سماد عضوي لتحسين التربة'],
      notes: 'تتطلب الري المتكرر بسبب سرعة تصريف المياه'
    },
    'clay': {
      plants: ['القمح', 'الأرز', 'القطن', 'البرسيم'],
      fertilizers: ['سماد فوسفاتي', 'سماد بوتاسي'],
      notes: 'تتميز بقدرة عالية على الاحتفاظ بالماء'
    },
    'loamy': {
      plants: ['الخيار', 'الفلفل', 'الخس', 'السبانخ', 'البصل'],
      fertilizers: ['سماد متوازن NPK', 'سماد عضوي'],
      notes: 'أفضل أنواع التربة للزراعة'
    },
    'silty': {
      plants: ['الذرة', 'القصب', 'البرسيم', 'الكتان'],
      fertilizers: ['سماد نيتروجيني', 'سماد عضوي'],
      notes: 'خصبة جداً ولكن قد تتكتل'
    }
  };

  const handleSoilTypeChange = (soilId) => {
    setSelectedSoilType(soilId);
  };

  const handleAnalysis = async () => {
    if (!selectedSoilType) {
      alert('يرجى اختيار نوع التربة');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const result = {
        soilType: soilTypes.find(s => s.id === selectedSoilType).name,
        ...soilRecommendations[selectedSoilType]
      };
      
      setAnalysisResult(result);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>تحليل التربة وتوصية المحاصيل</h2>
        <p>اختر نوع التربة للحصول على توصيات الزراعة المناسبة</p>
      </div>

      <div className="analysis-container">
        {/* Soil Type Selection */}
        <div className="soil-selection-section">
          <h3 className="section-title">
            <FaSeedling /> اختر نوع التربة
          </h3>
          
          <div className="soil-types-grid">
            {soilTypes.map((soil) => (
              <label key={soil.id} className="soil-type-label">
                <input
                  type="radio"
                  name="soilType"
                  checked={selectedSoilType === soil.id}
                  onChange={() => handleSoilTypeChange(soil.id)}
                  className="soil-radio"
                />
                <div className="soil-type-card">
                  <div className="radio-circle"></div>
                  <div className="soil-content">
                    <h4>{soil.name}</h4>
                    <p>{soil.description}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="analysis-actions">
            <button 
              onClick={handleAnalysis}
              disabled={!selectedSoilType || isLoading}
              className={`analyze-btn ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  جاري التحليل...
                </>
              ) : (
                <>
                  <FaCheckCircle />
                   المحاصيل والأسمدة المناسبة
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {analysisResult && (
          <div className="result-section">
            <div className="result-header">
              <FaCheckCircle className="success-icon" />
              <h3>نتائج التحليل</h3>
            </div>

            <div className="soil-result-card">
              <div className="soil-type-banner">
                <h4>نوع التربة: {analysisResult.soilType}</h4>
              </div>
              
              <div className="recommendations-grid">
                <div className="recommendation-card">
                  <h5><FaLeaf /> المحاصيل المناسبة</h5>
                  <div className="list">
                    {analysisResult.plants.map((plant, idx) => (
                      <div key={idx} className="list-item">
                        <span>•</span>
                        {plant}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="recommendation-card">
                  <h5>الأسمدة المناسبة</h5>
                  <div className="list">
                    {analysisResult.fertilizers.map((fertilizer, idx) => (
                      <div key={idx} className="list-item">
                        <span>•</span>
                        {fertilizer}
                      </div>
                    ))}
                  </div>
                </div>
                
              
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilAnalysis;