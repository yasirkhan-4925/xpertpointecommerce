import React from 'react'

import {LinkContainer} from 'react-router-bootstrap'

import { Pagination } from 'react-bootstrap'
import '../index.css'


const Paginate = ({ pages, page , isAdmin = false , keyword='' }) => {
    
    return  pages > 1 &&  (
        <> 
            
            <Pagination >
                {
                      
                    [...Array(pages).keys()].map(x => (
                        <LinkContainer  key={x + 1} to={ !isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1} ` : `/admin/productslist/${x+1}`}>
                            <Pagination.Item  action={x+1 === page}>
                                { x+1}
                            </Pagination.Item>
                        </LinkContainer>
                    ))

                }
               </Pagination>
           </> 

     )
}

export default Paginate