import React, { useEffect, useState } from 'react';

function Home() {
    const [data, setData] = useState(null);

    return (
        <div className="topComp">
            <div id="btitle">
              <p>This is a title: The titiliest title of them all</p>
            </div>
            <div id="bcontent">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis arcu nec est egestas, vel pellentesque risus fermentum. Proin ultricies urna at odio malesuada, non tristique erat rhoncus. Vestibulum fringilla orci vel urna bibendum, quis feugiat ligula vestibulum. Integer efficitur sagittis ligula a vehicula. Curabitur et sapien tincidunt, ultrices erat ut, consectetur nunc. Vivamus auctor, ligula vel convallis luctus, sapien ligula hendrerit ex, ut accumsan est lorem sed velit. Duis volutpat metus libero, et lacinia erat vulputate non.<br/>
                <br/>
                Nam feugiat, sapien vel hendrerit ultrices, arcu eros pellentesque est, id bibendum velit felis non est. Fusce suscipit auctor eros sed sodales. Sed tempor condimentum elit id tincidunt. In at ligula sit amet libero suscipit laoreet. Pellentesque venenatis lacus purus, et ultricies libero tincidunt eu. Nulla sed ultricies leo. Nulla facilisi. Nunc id fermentum ipsum, et blandit dolor. Ut eget lorem at libero facilisis lobortis. Nulla facilisi. Curabitur ut nisi sit amet lectus accumsan cursus id nec leo.<br/>
                <br/>

                Vestibulum condimentum vulputate urna, nec faucibus tortor posuere id. Proin at gravida lorem. Maecenas aliquam malesuada augue non venenatis. Duis ultrices at est id vehicula. In hac habitasse platea dictumst. Sed faucibus, nulla ac scelerisque egestas, nisi arcu pellentesque lacus, quis luctus lectus odio sit amet elit. Cras convallis mauris quis nunc euismod tempor. Proin vehicula urna eget justo fermentum rhoncus. Aenean tincidunt felis eget lacinia pretium.<br/>
                <br/>

                Phasellus euismod velit in lorem aliquet, at congue magna aliquet. Fusce bibendum feugiat mi, id dapibus lacus fermentum ac. Nulla facilisi. Nam malesuada, arcu in lacinia fringilla, lorem ante dignissim nisi, et suscipit enim libero ut lectus. Aenean eget justo massa. Nam ac vehicula mi. Vestibulum a tortor eros. Praesent tincidunt nunc id sollicitudin dignissim. Etiam ut est non augue tincidunt ultricies. Sed non turpis ac sem gravida mollis a nec turpis.<br/>
                <br/>

                Mauris scelerisque, turpis vel vulputate posuere, justo est suscipit mauris, a venenatis leo justo eget lorem. Donec vitae nunc at risus varius dignissim ut vitae eros. Aliquam ac neque felis. Integer rhoncus augue eu dolor tincidunt, vel sodales nulla bibendum. Vestibulum ac elementum arcu. Nam vel lacus magna. Suspendisse venenatis orci vel dolor lobortis, a sodales justo facilisis. Pellentesque et massa libero. Duis tincidunt lectus id velit auctor accumsan. Fusce scelerisque justo metus, nec vulputate mauris sodales id.<br/>
                <br/>

                Suspendisse potenti. Nullam id felis consequat, tempus elit quis, maximus augue. In eget enim eget magna hendrerit laoreet. Integer sed ante auctor, tincidunt dolor nec, eleifend elit. Suspendisse dictum dui vitae ante gravida, ac lacinia dolor luctus. Donec bibendum felis non feugiat rutrum. Etiam malesuada urna id nisi suscipit, quis bibendum mi consectetur. Curabitur suscipit sapien vitae orci feugiat, at fermentum orci ultricies. Pellentesque molestie velit a nisl gravida, nec finibus mi convallis.<br/>
                <br/>

                Donec malesuada tortor et tincidunt fermentum. Integer rhoncus enim at diam vestibulum, sed placerat arcu bibendum. Fusce in metus posuere, congue arcu vitae, lacinia sapien. In sit amet lorem nunc. Ut luctus convallis elit, at consectetur est egestas vel. Phasellus fringilla interdum magna a efficitur. Nulla iaculis arcu nunc, id interdum felis laoreet ac. Curabitur lobortis augue eget nulla faucibus, eget laoreet eros fermentum.<br/>
                <br/>

                Vivamus fermentum ligula sit amet nunc ultricies malesuada. In quis erat non ligula dapibus dictum a eget orci. Proin sit amet turpis sit amet ipsum vulputate luctus a et risus. Vestibulum egestas urna quis enim vestibulum, ac viverra nisi bibendum. Suspendisse nec ex at orci condimentum sodales. Ut facilisis mauris orci, vitae fermentum dui vestibulum quis. Nulla malesuada eros at vehicula suscipit. Aenean eget magna libero. Mauris in lacus sed orci ullamcorper consequat in ut arcu.<br/>
                <br/>
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </div>
        </div>
    )
};

export default Home;