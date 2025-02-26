--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.2

-- Started on 2025-02-26 21:53:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS "TransactionsDB";
--
-- TOC entry 4952 (class 1262 OID 16443)
-- Name: TransactionsDB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "TransactionsDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';


ALTER DATABASE "TransactionsDB" OWNER TO postgres;

\connect "TransactionsDB"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 220 (class 1259 OID 16462)
-- Name: customer_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customer_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customer_seq_id OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16455)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer DEFAULT nextval('public.customer_seq_id'::regclass) NOT NULL,
    name character varying NOT NULL,
    phone_number character varying,
    email character varying,
    address character varying,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16472)
-- Name: product_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_seq_id OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16465)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer DEFAULT nextval('public.product_seq_id'::regclass) NOT NULL,
    name character varying NOT NULL,
    price numeric DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16490)
-- Name: transaction_detail_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_detail_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaction_detail_seq_id OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16491)
-- Name: transaction_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_details (
    id integer DEFAULT nextval('public.transaction_detail_seq_id'::regclass) NOT NULL,
    transaction_id integer NOT NULL,
    product_id integer NOT NULL,
    count integer DEFAULT 1 NOT NULL,
    sub_total numeric DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.transaction_details OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16464)
-- Name: transaction_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaction_seq_id OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16475)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer DEFAULT nextval('public.transaction_seq_id'::regclass) NOT NULL,
    customer_id integer NOT NULL,
    transaction_date timestamp without time zone DEFAULT now() NOT NULL,
    total numeric DEFAULT 0 NOT NULL,
    user_id integer NOT NULL,
    is_active boolean DEFAULT true
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16453)
-- Name: user_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_seq_id OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16444)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.user_seq_id'::regclass) NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4939 (class 0 OID 16455)
-- Dependencies: 219
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.customers VALUES (2, 'Indra', '0812342823', 'indra77@email.com', 'hello world', true) ON CONFLICT DO NOTHING;
INSERT INTO public.customers VALUES (3, 'Ananta Kusuma Pangkasidhi', '0812354113', 'kusumaananta042@gmail.com', 'Perum Purimas Gianyar 7 C6-36', false) ON CONFLICT DO NOTHING;
INSERT INTO public.customers VALUES (1, 'Ananta Kusuma Pangkasidhi', '08123787988', 'ananta789@mail.com', 'purimas gianyar', true) ON CONFLICT DO NOTHING;
INSERT INTO public.customers VALUES (4, 'Mirna', '0812723687', 'Mirna20@mail.com', 'Gianyar', true) ON CONFLICT DO NOTHING;
INSERT INTO public.customers VALUES (5, 'Jessica', '0782187238', 'jessica20@mail.com', 'Nirwana', true) ON CONFLICT DO NOTHING;


--
-- TOC entry 4942 (class 0 OID 16465)
-- Dependencies: 222
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products VALUES (5, 'Telur', 8000.0, true) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (1, 'susu', 10000.0, true) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (6, 'Mie', 2000.0, true) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (7, 'Teh', 7000.0, true) ON CONFLICT DO NOTHING;


--
-- TOC entry 4946 (class 0 OID 16491)
-- Dependencies: 226
-- Data for Name: transaction_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.transaction_details VALUES (1, 2, 1, 2, 16000, true) ON CONFLICT DO NOTHING;


--
-- TOC entry 4944 (class 0 OID 16475)
-- Dependencies: 224
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.transactions VALUES (2, 1, '2025-02-25 22:37:38.540211', 16000, 1, true) ON CONFLICT DO NOTHING;
INSERT INTO public.transactions VALUES (1, 1, '2025-02-25 22:21:13.959567', 8000, 1, false) ON CONFLICT DO NOTHING;


--
-- TOC entry 4937 (class 0 OID 16444)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'Ananta99', '$2b$12$N/tOOXBiHfKj2mbO1v7AruJYtavmjmoH06Cu6xJ8MAxfIjrldW/FW') ON CONFLICT DO NOTHING;


--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 220
-- Name: customer_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customer_seq_id', 5, true);


--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 223
-- Name: product_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_seq_id', 7, true);


--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 225
-- Name: transaction_detail_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_detail_seq_id', 1, true);


--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 221
-- Name: transaction_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_seq_id', 2, true);


--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 218
-- Name: user_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_seq_id', 1, true);


--
-- TOC entry 4781 (class 2606 OID 16461)
-- Name: customers customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- TOC entry 4783 (class 2606 OID 16471)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 16500)
-- Name: transaction_details transaction_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_details
    ADD CONSTRAINT transaction_details_pkey PRIMARY KEY (id);


--
-- TOC entry 4785 (class 2606 OID 16484)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- TOC entry 4777 (class 2606 OID 16452)
-- Name: users username_uq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username_uq UNIQUE (username);


--
-- TOC entry 4779 (class 2606 OID 16450)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4790 (class 2606 OID 16506)
-- Name: transaction_details fk_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_details
    ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 4788 (class 2606 OID 16485)
-- Name: transactions fk_transaction_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_transaction_customer_id FOREIGN KEY (customer_id) REFERENCES public.customers(id);


--
-- TOC entry 4791 (class 2606 OID 16501)
-- Name: transaction_details fk_transaction_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_details
    ADD CONSTRAINT fk_transaction_id FOREIGN KEY (transaction_id) REFERENCES public.transactions(id);


--
-- TOC entry 4789 (class 2606 OID 16512)
-- Name: transactions fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


-- Completed on 2025-02-26 21:53:34

--
-- PostgreSQL database dump complete
--

