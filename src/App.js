//reactの機能であるuseEffect,useStateをimport

import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon } from './utils/pokemon';
import { getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';


//App関数
function App() {
  //大元となるURLを定義
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  //useStateで状態を管理。初期値はtrueでsetLoadingを呼ぶたびにloadingが更新される
  //下3つも同様
  const [loading ,setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  //useEffectは第二引数の値が変わった時に再レンダリングさせるもの
  //今回は空欄なのでマウント時のみ関数を作用させる。
  useEffect(() => {
  //fetchはデータの取得のこと。asyncawaitで非同期処理を行なっている
  const fetchPokemonData = async () => {
    //全てのポケモンデータをinitialURLより取得
    let res =await getAllPokemon(initialURL)
    //resの中のresults,next,previousを呼んでuseStateを更新
    loadPokemon(res.results);
    setNextURL(res.next);
    setPrevURL(res.previous);
    //setLoadingにfalseを与えuseStateを更新
    setLoading(false);
  };
  // 関数の実行
  fetchPokemonData();
  }, []);

  //非同期処理。fetchPokemonDataで取得したres.resultsを引数dataとして使用
  const loadPokemon = async (data) => {
    //promise.allは全ての処理が終わるまで待つ
    let _pokemonData = await Promise.all(
      //取得した配列をpokemonと名付けた1つ1つのオブジェクトに分けて繰り返し展開する
      data.map((pokemon) => {
        //展開したpokemonというオブジェクトの中のurl要素をpokemonRecordと定義し返す
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      }) 
    );
    //setPokemonDataに_pokemonDataを渡してuseStateが更新される
    setPokemonData(_pokemonData);
  };


  //非同期処理。ページ更新時には自動で起動しない関数。
  //setLoadingをtrueにしてLoading...を表示しながら次のページを取得する
  const handleNextPage = async () => {
    setLoading(true);
    //nextURLを取得する関数をdataと定義する
    let data = await getAllPokemon(nextURL);
    //nextURLの中のresultsという要素を取得。した3つはuseStateを更新
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  
  //もしprevURLが存在しなければ何も返さない。存在すれば以下の処理を返す。非同期処理
  const handlePrevPage = async () => {
    if (!prevURL) return;
    ///prevURLの中のresultsという要素を取得。した3つはuseStateを更新
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };


  return (
    <>
      {/* Navbarコンポーネント */}
      <Navbar />

      <div className="App">
        {/* loadingがtrueならLoading...を表示、falseなら以下を表示 */}
        {loading ? (<h1>Loading...</h1>) :( 
          <>
            <div className="pokemonCardContainer">
              {/* pokemonDataをそれぞれのオブジェクトに展開しつつ何番目のオブジェクトかも情報として取り出す */}
              {pokemonData.map((pokemon,i) => {
                //Cardコンポーネントにオブジェクトの配列番号とpokemon命名したpokemonオブジェクトを渡す。
                return <Card key={i} pokemon={pokemon}/>;
              })}
            </div>
            <div className="btn">
              {/* ボタンクリック時にhandle___Page関数が発火する */}
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
    );
  }

export default App;
