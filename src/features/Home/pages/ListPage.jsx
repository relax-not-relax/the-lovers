import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import FilterViewer from '../components/FilterViewer';
import '../style.scss';
import postApiOdata from '../../../api/odata/postApiOdata';
import PostSkeleton from '../components/PostSkeleton';
import PostList from '../components/PostList';
import DateFilter from '../components/FilterViewer/DateFilter';
import StorageKeys from '../../../constants/storage-keys';
import axios from 'axios';


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
            // $filter: params.$filter || `type eq 'gift'`,
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
                const response = await postApiOdata.getAll(queryParams);
                //console.log(response);
                setPagination(response.pagination);
                setPostList(response.data);

                //console.log(response.status);
            } catch (error) {
                //console.log(error.code);
                if (error.code === 'ERR_NETWORK') {
                    const refreshToken = localStorage.getItem(StorageKeys.REFRESH);
                    const response = await axios.get(`https://beprn231catdoglover20231017210252.azurewebsites.net/api/Auth/RefreshToken/${refreshToken}`);
                    if (response.status === 200) {
                        localStorage.setItem(StorageKeys.TOKEN, response.data.accessToken);
                        window.location.reload();
                    }

                }

                //setPostList([]);
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

        const filters = {
            ...queryParams,
            $filter: `Type eq '${newFilters}'`,
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
                        <Typography className='header'>Feeds</Typography>
                    </Grid>
                    <Grid item style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '450px'
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