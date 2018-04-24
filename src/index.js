import _ from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';
import YTSearch  from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAkSv1ridMewLFGpG2-JJEq7jDZBg6Js2Q';



//Create a new Component. This Component should produce some html
class  App extends React.Component{
	constructor(props){
		super(props);
		this.state = { videos:[],
			selectedVideo:null
		};
		this.videoSearch('surfboards');
	}

	videoSearch(term){
		YTSearch({key:API_KEY, term:term}, (videos) => {
			this.setState({videos:videos,selectedVideo:videos[0]});
		});

	}

	render(){

		const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300);

		return (<div>
			<SearchBar onSearchTermChange={videoSearch}/>
			<VideoDetail video={this.state.selectedVideo}/>
			<VideoList onVideoSelect={selectedVideo=>this.setState({selectedVideo})} videos={this.state.videos} /> 
		</div>)
	}
}

//jsx cannot be interepted by browser so this is transpiled using babel.



//Create a Component and put it on Dom.
ReactDom.render(<App />,document.querySelector('.container'));