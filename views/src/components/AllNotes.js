import React from 'react';
import GetNotes from './GetNotes'


function AllNotes() {
    const columns = ['title', 'note'];    

    return (
        <div className="topComp">
            <div className="ntitle">
              <p>All Notes</p>
            </div>
            <div className="ncontent">
                <GetNotes table="notes" columns={columns} className="note"/>
            </div>  
        </div>
    )
}

export default AllNotes;