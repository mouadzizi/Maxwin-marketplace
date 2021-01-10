import React from 'react'
import  Svg ,{ Path, G} from 'react-native-svg';

export default function ManClothes() {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512"
        stroke='#4898D3'
        fill='#4898D3'
        fillRule={'nonzero'}
        height={40}
        width={35}
        >
        <Path fill="#4898D3" d="M300.138 132.414v105.931H256V105.931z" />
        <Path
          d="M423.724 256v256H88.276V256H0L14.301 99.046A61.575 61.575 0 0152.26 47.581l85.628-35.31 73.975 120.143L256 105.931v132.414h44.138V132.414l79.448-114.759 2.207-5.12 79.095 34.604a61.685 61.685 0 0136.723 51.023L512 256h-88.276z"
          fill="#F16E44"
        />
        <Path
          fill="#4898D3"
          d="M256 105.931l-44.138 26.483L137.887 12.27 167.724 0z"
        />
        <Path fill="#F16E44" d="M353.103 0L256 105.931 167.724 0H282.483z" />
        <Path fill="#ffd374" d="M423.724 256H512v35.31h-88.276z" />
        <Path
          fill="#4898D3"
          d="M381.793 12.535l-2.207 5.12-79.448 114.759L256 105.931 353.103 0z"
        />
        <Path fill="#ffd374" d="M0 256h88.276v35.31H0z" />
        <G fill="#F16E44">
          <Path d="M414.897 141.241h17.655V291.31h-17.655zM79.448 150.069h17.655V291.31H79.448z" />
        </G>
        <G fill="#4898D3">
          <Path d="M282.483 194.207h17.655v17.655h-17.655zM282.483 158.897h17.655v17.655h-17.655z" />
        </G>
      </Svg>
    )
}