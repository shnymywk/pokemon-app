import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//index.htmlのrootを取得してreactの管理下におき編集できる状態にする
const root = ReactDOM.createRoot(document.getElementById('root'));
//Appコンポーネントをroot配下におくことでAppコンポーネントをいじればhtmlを書き換えることができるようになる
root.render(
  //StrictModeは開発中に問題のあるコードを検出して警告してくれる機能
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

