import { Box, Grid, Pagination, Typography } from '@mui/material';
import { Container } from '@mui/system';
import queryString from 'query-string';
import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import postApiOdata from '../../../api/odata/postApiOdata';
import FilterViewer from '../../Home/components/FilterViewer';
import DateFilter from '../../Home/components/FilterViewer/DateFilter';
import PostSkeleton from '../../Home/components/PostSkeleton';
import PostList from '../components/PostList';

ListPage.propTypes = {

};

function ListPage(props) {

    const [postList, setPostList] = useState([]);

    const history = useHistory();
    const location = useLocation();

    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        const user = JSON.parse(localStorage.getItem('userTheLovers'));

        return {
            ...params,
            //$filter: params.$filter || `type eq 'service'`,
            $filter: params.$filter || `OwnerId eq ${user.accountId}`,
            accountId: user.accountId,
            $top: Number.parseInt(params.$top) || 5,
            $skip: Number.parseInt(params.$skip) || 0,
            $orderBy: params.$orderBy || "createDate desc",
            $expand: `Gifts,Products,Services`,
            _page: Number.parseInt(params._page) || 1
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
                setPostList(data);
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

    const handleReset = () => {

        setLoading(true);

        const filters = {
            $top: 5,
            $skip: 0,
            $orderBy: "createDate desc",
            $expand: `Gifts,Products,Services`,
            _page: 1
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    }

    const handleTypeChange = (newFilters) => {

        setLoading(true);
        const user = JSON.parse(localStorage.getItem('userTheLovers'));

        const filters = {
            ...queryParams,
            $filter: `(Type eq '${newFilters}') and (OwnerId eq ${user.accountId})`,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        })

        // setLoading(false);
    }

    const sortByDate = (newFilters) => {
        setLoading(true);

        const filters = {
            ...queryParams,
            $orderBy: newFilters,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        })
    }

    return (
        <Box className='homeSection'>
            <Box className='homeSection__hd'>
                <Grid container>
                    <Grid item>
                        <Typography className='header'>My Posts</Typography>
                    </Grid>
                    <Grid item style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '430px'
                    }}>
                        <FilterViewer onChange={handleTypeChange} onReset={handleReset} />
                    </Grid>
                </Grid>

                <Box style={{
                    marginTop: '50px',
                    paddingLeft: '680px',
                    paddingRight: '27px'
                }}>
                    <DateFilter onSorting={sortByDate} />
                </Box>

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
            </Box>
        </Box>
    );
}

export default ListPage;