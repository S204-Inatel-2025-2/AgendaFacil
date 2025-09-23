--
-- PostgreSQL database dump
--

\restrict 5PaEBrA9YeztkOJMGY6hKUsBGAmmF5QHTx9AotqFIOeKGof8W6p4pSBCyFwuCOQ

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.14 (Debian 15.14-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: servicos; Type: TABLE; Schema: public; Owner: usuario
--

CREATE TABLE public.servicos (
    id integer NOT NULL,
    nome character varying(150) NOT NULL,
    categoria character varying(100) NOT NULL,
    descricao text NOT NULL,
    duracao_minutos integer NOT NULL,
    preco numeric(10,2) NOT NULL
);


ALTER TABLE public.servicos OWNER TO usuario;

--
-- Name: servicos_id_seq; Type: SEQUENCE; Schema: public; Owner: usuario
--

CREATE SEQUENCE public.servicos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.servicos_id_seq OWNER TO usuario;

--
-- Name: servicos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: usuario
--

ALTER SEQUENCE public.servicos_id_seq OWNED BY public.servicos.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: usuario
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome_completo character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    telefone character varying(20),
    senha character varying(255) NOT NULL,
    confirmar_senha character varying(255)
);


ALTER TABLE public.usuarios OWNER TO usuario;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: usuario
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO usuario;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: usuario
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: servicos id; Type: DEFAULT; Schema: public; Owner: usuario
--

ALTER TABLE ONLY public.servicos ALTER COLUMN id SET DEFAULT nextval('public.servicos_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: usuario
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: servicos; Type: TABLE DATA; Schema: public; Owner: usuario
--

COPY public.servicos (id, nome, categoria, descricao, duracao_minutos, preco) FROM stdin;
1	Consulta médica	Saúde	Atendimento clínico geral	30	150.00
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: usuario
--

COPY public.usuarios (id, nome_completo, email, telefone, senha, confirmar_senha) FROM stdin;
1	Ana Souza	ana@email.com	21999999999	minha_senha	\N
2	João Silva	joao@email.com	11999999999	senha123	\N
\.


--
-- Name: servicos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: usuario
--

SELECT pg_catalog.setval('public.servicos_id_seq', 1, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: usuario
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);


--
-- Name: servicos servicos_pkey; Type: CONSTRAINT; Schema: public; Owner: usuario
--

ALTER TABLE ONLY public.servicos
    ADD CONSTRAINT servicos_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: usuario
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: usuario
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict 5PaEBrA9YeztkOJMGY6hKUsBGAmmF5QHTx9AotqFIOeKGof8W6p4pSBCyFwuCOQ

