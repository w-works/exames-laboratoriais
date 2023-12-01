    var tipoSelecionado = '';

    function selecionarTipo(tipo) {
        var botoes = document.querySelectorAll('.search-button');

        botoes.forEach(function (botao) {
            botao.classList.remove('selected-button');
        });

        if (tipo === tipoSelecionado) {
            tipoSelecionado = '';
        } else {
            tipoSelecionado = tipo;
            var botaoSelecionado = document.querySelector('.search-button[data-tipo="' + tipo + '"]');
            botaoSelecionado.classList.add('selected-button');
        }

        if (!tipoSelecionado) {
            location.reload();
        } else {
            atualizarOpcoes();
        }
    }

    function atualizarOpcoes() {
        var selecao = document.getElementById("selecao");
        selecao.innerHTML = '';

        if (tipoSelecionado) {
            switch (tipoSelecionado) {
                case 'Hemograma':
                    adicionarOpcao(selecao, 'Selecione');
                    adicionarOpcao(selecao, 'Eritrograma');
                    adicionarOpcao(selecao, 'Leucograma');
                    adicionarOpcao(selecao, 'Trombócitos');
                    break;
                case 'Bioquímico':
                    adicionarOpcao(selecao, 'Selecione');
                    adicionarOpcao(selecao, 'Nutrientes e Metabólicos');
                    adicionarOpcao(selecao, 'Enzimas');
                    adicionarOpcao(selecao, 'Eletrólitos e Metais');
                    adicionarOpcao(selecao, 'Hormônios');
                    break;
                case 'Urinálise':
                    adicionarOpcao(selecao, 'Selecione');
                    adicionarOpcao(selecao, 'Exame Físico');
                    adicionarOpcao(selecao, 'Exame Químico');
                    adicionarOpcao(selecao, 'Sedimentação');
                    break;
                default:
                    break;
            }
        }
    }

    function atualizarSelecao2() {
        var selecao = document.getElementById("selecao");
        var selecao2 = document.getElementById("selecao2");
        selecao2.innerHTML = '';
        switch (selecao.value) {
            case 'Eritrograma':
                adicionarOpcao(selecao2, 'Selecione');
                adicionarOpcao(selecao2, 'Hemácias');
                adicionarOpcao(selecao2, 'Hemoglobina');
                adicionarOpcao(selecao2, 'Hematócrito');
                break;
            case 'Leucograma':
                adicionarOpcao(selecao2, 'Selecione');
                adicionarOpcao(selecao2, 'Leucócitos');
                adicionarOpcao(selecao2, 'Neutrófilos');
                adicionarOpcao(selecao2, 'Bastonetes');
                adicionarOpcao(selecao2, 'Eosinófilos');
                adicionarOpcao(selecao2, 'Basófilos');
                adicionarOpcao(selecao2, 'Monócitos');
                adicionarOpcao(selecao2, 'Linfócitos');
                break;
            case 'Trombócitos':
                adicionarOpcao(selecao2, 'Selecione');
                adicionarOpcao(selecao2, 'Plaquetas');
                break;
            case 'Nutrientes e Metabólicos':
                adicionarOpcao(selecao2, 'Selecione');
                adicionarOpcao(selecao2, 'Uréia Plasmática');
                adicionarOpcao(selecao2, 'Creatinina Plasmática');
                adicionarOpcao(selecao2, 'Proteina Plasmática Total');
                adicionarOpcao(selecao2, 'Albumina Plasmática');
                adicionarOpcao(selecao2, 'Bilirrubina Plasmática');
                adicionarOpcao(selecao2, 'Ácidos Biliares Plasmáticos');
                adicionarOpcao(selecao2, 'Triglicerídeos Plasmáticos');
                adicionarOpcao(selecao2, 'Colesterol Plasmático');
                adicionarOpcao(selecao2, 'Glicose Plasmática');
                adicionarOpcao(selecao2, 'Amônia Plasmática');
                break;
            case 'Enzimas':
                adicionarOpcao(selecao2, 'Selecione');
                adicionarOpcao(selecao2, 'Alanina Aminotransferase');
                adicionarOpcao(selecao2, 'Aspartato Aminotransferase');
                adicionarOpcao(selecao2, 'Fosfatase Alcalina');
                adicionarOpcao(selecao2, 'Amilase');
                adicionarOpcao(selecao2, 'Lipase');
                adicionarOpcao(selecao2, 'Creatina Quinase');
                adicionarOpcao(selecao2, 'Lactato Desidrogenase');
                break;
            case 'Eletrólitos e Metais':
                adicionarOpcao(selecao2, 'Selecione');
                adicionarOpcao(selecao2, 'Sódio Plasmático');
                adicionarOpcao(selecao2, 'Potássio Plasmático');
                adicionarOpcao(selecao2, 'Cloro Plasmático');
                adicionarOpcao(selecao2, 'Dióxido de Carbono');
                adicionarOpcao(selecao2, 'Cálcio Plasmático');
                adicionarOpcao(selecao2, 'Fosfato Inorgânico Plasmático');
                break;
            case 'Hormônios':
                adicionarOpcao(selecao2, 'Selecione');
                adicionarOpcao(selecao2, 'Tiroxina');
                adicionarOpcao(selecao2, 'Cortisol');
                adicionarOpcao(selecao2, 'Insulina');
                break;
            case 'Exame Físico':
                adicionarOpcao(selecao2, 'Selecione');
                adicionarOpcao(selecao2, 'Volume Urinário');
                adicionarOpcao(selecao2, 'Aparência de Urina');
                adicionarOpcao(selecao2, 'Densidade Urinária');
                break;
            case 'Exame Químico':
                adicionarOpcao(selecao2, 'Selecione');
                adicionarOpcao(selecao2, 'PH Urinário');
                adicionarOpcao(selecao2, 'Proteína Urinária');
                adicionarOpcao(selecao2, 'Glicose Urinária');
                adicionarOpcao(selecao2, 'Corpos Cetônicos Urinários');
                adicionarOpcao(selecao2, 'Bilirrubina Urinária');
                adicionarOpcao(selecao2, 'Sais Biliares Urinários');
                adicionarOpcao(selecao2, 'Urobilinogênio Urinário');
                adicionarOpcao(selecao2, 'Pigmento Sanguíneo Urinário');
                adicionarOpcao(selecao2, 'Hematúria');
                adicionarOpcao(selecao2, 'Mioglobinúria');
                adicionarOpcao(selecao2, 'Leucócitos Urinários');
                break;
            case 'Sedimentação':
                adicionarOpcao(selecao2, 'Selecione');
                adicionarOpcao(selecao2, 'Hemácias');
                adicionarOpcao(selecao2, 'Leucócitos');
                adicionarOpcao(selecao2, 'Células Epiteliais');
                adicionarOpcao(selecao2, 'Cilindros');
                adicionarOpcao(selecao2, 'Bactérias');
                adicionarOpcao(selecao2, 'Leveduras e Fungos');
                adicionarOpcao(selecao2, 'Parasitas');
                adicionarOpcao(selecao2, 'Espermatózoides');
                adicionarOpcao(selecao2, 'Gotículas de Gordura');
                adicionarOpcao(selecao2, 'Muco');
                adicionarOpcao(selecao2, 'Cristais');
                adicionarOpcao(selecao2, 'Artefatos');
                break;
            default:

                document.getElementById("caixa-selecao2").style.display = "none";
        }
    }

    function atualizarSelecao3() {
        var selecao = document.getElementById("selecao");
        var selecao2 = document.getElementById("selecao2");
        var selecao3 = document.getElementById("selecao3");

        selecao3.innerHTML = '';

        switch (selecao2.value) {
            case 'Hemácias':
            case 'Hemoglobina':
            case 'Hematócrito':
            case 'Leucócitos':
            case 'Neutrófilos':
            case 'Bastonetes':
            case 'Eosinófilos':
            case 'Basófilos':
            case 'Monócitos':
            case 'Linfócitos':
            case 'Plaquetas':
                adicionarOpcao(selecao3, 'Selecione');
                adicionarOpcao(selecao3, 'Aumentado');
                adicionarOpcao(selecao3, 'Diminuído');
                break;

            case 'Uréia Plasmática':
            case 'Creatinina Plasmática':
            case 'Proteina Plasmática Total':
            case 'Albumina Plasmática':
            case 'Bilirrubina Plasmática':
            case 'Ácidos Biliares Plasmáticos':
            case 'Triglicerídeos Plasmáticos':
            case 'Colesterol Plasmático':
            case 'Glicose Plasmática':
            case 'Amônia Plasmática':
                adicionarOpcao(selecao3, 'Selecione');
                adicionarOpcao(selecao3, 'Aumentado');
                adicionarOpcao(selecao3, 'Diminuído');
                break;

            case 'Alanina Aminotransferase':
            case 'Aspartato Aminotransferase':
            case 'Fosfatase Alcalina':
            case 'Amilase':
            case 'Lipase':
            case 'Creatina Quinase':
            case 'Lactato Desidrogenase':
                adicionarOpcao(selecao3, 'Selecione');
                adicionarOpcao(selecao3, 'Aumentado');
                adicionarOpcao(selecao3, 'Diminuído');
                break;

            case 'Sódio Plasmático':
            case 'Potássio Plasmático':
            case 'Cloro Plasmático':
            case 'Dióxido de Carbono':
            case 'Cálcio Plasmático':
            case 'Fosfato Inorgânico Plasmático':
                adicionarOpcao(selecao3, 'Selecione');
                adicionarOpcao(selecao3, 'Aumentado');
                adicionarOpcao(selecao3, 'Diminuído');
                break;

            case 'Tiroxina':
            case 'Cortisol':
            case 'Insulina':
                adicionarOpcao(selecao3, 'Selecione');
                adicionarOpcao(selecao3, 'Aumentado');
                adicionarOpcao(selecao3, 'Diminuído');
                break;
                
            default:
        
        }
    }

    function adicionarOpcao(select, valor) {
        var option = document.createElement("option");
        option.text = valor;
        option.value = valor;
        select.add(option);
    }

    document.getElementById("selecao").addEventListener("change", atualizarSelecao2);

    document.getElementById("selecao2").addEventListener("change", atualizarSelecao3);