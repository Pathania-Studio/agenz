
import React from 'react';
import { DeviceType } from '../../types';

interface DeviceMockupProps {
  type: DeviceType;
  image: string;
  className?: string;
}

const DeviceMockup: React.FC<DeviceMockupProps> = ({ type, image, className = '' }) => {
  const getDeviceDimensions = () => {
    // Responsive scaling based on viewport would be ideal, but fixed ratios work for the morph
    switch (type) {
      case DeviceType.MOBILE:
        return {
          width: 'clamp(240px, 20vw, 300px)',
          aspectRatio: '9 / 15.5',
          borderRadius: '40px',
          borderWidth: '10px',
        };
      case DeviceType.TABLET:
        return {
          width: 'clamp(400px, 40vw, 550px)',
          aspectRatio: '4 / 3',
          borderRadius: '24px',
          borderWidth: '12px',
        };
      case DeviceType.LAPTOP:
        return {
          width: 'clamp(500px, 60vw, 850px)',
          aspectRatio: '16 / 10',
          borderRadius: '16px',
          borderWidth: '14px',
        };
      default:
        return {};
    }
  };

  const dim = getDeviceDimensions();

  return (
    <div 
      className={`relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden bg-[#0a0a0a] shadow-[0_0_100px_rgba(0,0,0,0.8)] border-[#1a1a1a] ${className}`}
      style={{
        width: dim.width,
        aspectRatio: dim.aspectRatio,
        borderRadius: dim.borderRadius,
        borderWidth: dim.borderWidth,
        borderStyle: 'solid',
      }}
    >
      {/* Dynamic Notch / Camera */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 bg-[#1a1a1a] z-30 transition-all duration-700
        ${type === DeviceType.MOBILE ? 'w-24 h-5 rounded-b-2xl' : 'w-2 h-2 rounded-full mt-2'}
      `}></div>
      
      {/* Internal Display */}
      <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
        <img 
          src={image} 
          alt="Interface Preview" 
          className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
          loading="lazy"
        />
        
        {/* UI Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
          <div className="space-y-2 opacity-40">
            <div className="h-1 w-1/4 bg-blue-500 rounded-full"></div>
            <div className="h-1 w-1/3 bg-white/20 rounded-full"></div>
          </div>
        </div>

        {/* Screen Glare */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30"></div>
      </div>

      {/* Laptop Base (Only visible in logic via parent positioning or extra divs, 
          but for a pure morph we stick to the main screen body) */}
      {type === DeviceType.LAPTOP && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></div>
      )}
    </div>
  );
};

export default DeviceMockup;
