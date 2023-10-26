import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
//import FilterViewer from '../components/FilterViewer';
import '../style.scss';
import postApiOdata from '../../../api/odata/postApiOdata';
import PostSkeleton from '../components/PostSkeleton';
import PostList from '../components/PostList';


ListPage.propTypes = {

};

function ListPage(props) {

    const [postList, setPostList] = useState([]);

    const history = useHistory();
    const location = useLocation();

    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);

        return {
            ...params,
            $filter: params.$filter || `type eq 'gift'`,
            $expand: "Gifts",
            _page: Number.parseInt(params._page) || 1,
            $top: Number.parseInt(params.$top) || 8,
            $skip: Number.parseInt(params.$skip) || 0,
        }
    }, [location.search]);

    const [loading, setLoading] = useState(true);

    const [pagination, setPagination] = useState({
        limit: 3,
        total: 10,
        page: 1
    });

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await postApiOdata.getAll(queryParams);
                console.log({ data, pagination });
                setPagination(pagination);
                setPostList(data.value);
            } catch (error) {
                console.log('Failed to load post', error);
                setPostList([]);
            }

            setLoading(false);
        })();
    }, [queryParams])

    const handlePageChange = (e, page) => {

        const filters = {
            ...queryParams,
            _page: page,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };


    return (
        <Box className='homeSection'>
            <Box className='homeSection__hd'>
                <Grid container>
                    <Grid item md={4} lg={4}>
                        <Typography className='header'>Feeds</Typography>
                    </Grid>
                    <Grid item md={8} lg={8}>
                        {/* <FilterViewer /> */}
                    </Grid>
                    <Container>
                        <Box style={{ margin: '50px 0' }}>
                            {loading ? <PostSkeleton length={5} /> : <PostList data={postList} />}
                        </Box>

                        <Box className="pagination">

                            <Pagination
                                color="primary"
                                count={Math.ceil(pagination.total / pagination.limit)}
                                page={pagination.page}
                                onChange={handlePageChange}>
                            </Pagination>

                        </Box>
                    </Container>
                </Grid>
            </Box>
        </Box>
    );
}

export default ListPage;