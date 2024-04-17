import { rankItem } from "@tanstack/match-sorter-utils";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useEquiposStore, useUserStore } from "../../../store/index";
import { v } from "../../../styles/index";
import { TableActions } from "../index";
import { Filter, Paginacion } from "./index";

// componente de la tabla de monitores, detalle de su funcionamiento en la tabla de equipos

export function TableMonitores({
  data,
  setopenRegistro,
  setdataSelect,
  setAccion,
  globalFilter,
}) {
  function fuzzyFilter(row, columnId, value, addMeta) {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  }

  const [columnFilters, setColumnFilters] = useState([]);
  const [setPagina] = useState(1);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const { borrarEquipos } = useEquiposStore();
  const { activeUser } = useUserStore();

  const rolesACentros = {
    4: [5, 7], // Lindo Maya: PLI y PMY
    3: [6, 4], // Mar Beach: PMA y PBE
    5: [5], // Grand: GHP
  };
  const editar = (data) => {
    if (activeUser.rol_id !== 1) {
      const centrosPermitidos = rolesACentros[activeUser.rol_id];
      if (centrosPermitidos && centrosPermitidos.includes(data.centro_id)) {
        // El usuario tiene un rol permitido y el equipo está asignado a un centro permitido
      } else {
        return Swal.fire({
          icon: "error",
          title: " Error",
          text: "No tienes permiso para eliminar este equipo",
        });
      }
    }
    setopenRegistro(true);
    setdataSelect(data);
    setAccion("Editar");
  };

  const eliminar = (p) => {
    if (activeUser.rol_id !== 1) {
      // 1 es el ID del rol "Administrador"
      const centrosPermitidos = rolesACentros[activeUser.rol_id];
      if (centrosPermitidos && centrosPermitidos.includes(p.centro_id)) {
        // El usuario tiene un rol permitido y el equipo está asignado a un centro permitido
      } else {
        return Swal.fire({
          icon: "error",
          title: " Error",
          text: "No tienes permiso para eliminar este equipo",
        });
      }
    }

    // El resto de tu código de eliminación aquí...
    Swal.fire({
      title: "¿Estas seguro de eliminar esto?",
      text: "este cambio sera irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await borrarEquipos({ id: p.id });
        Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
      }
    });
  };
  const columns = [
    {
      accessorKey: "nombre",
      header: "Nombre Equipo",
      cell: (info) => (
        <td
          data-title="Nombre Equipo"
          className="ContentCell"
        >
          <span>{info.getValue()}</span>
        </td>
      ),
    },
   /* {
      accessorKey: "nombre_usuario",
      header: "Nombre Usuario",
      cell: (info) => (
        <td
          data-title="Nombre Usuario"
          className="ContentCell"
        >
          <span>{info.getValue()}</span>
        </td>
      ),
    },
    {
      accessorKey: "apellido_usuario",
      header: "Apellido Usuario",
      enableColumnFilter: false,

      cell: (info) => (
        <td
          data-title="Apellido Usuario"
          className="ContentCell"
        >
          <span>{info.getValue()}</span>
        </td>
      ),
    },*/
    {
      accessorKey: "numserie",
      header: "Numero de Serie",
      cell: (info) => (
        <td
          data-title="Numero de Serie"
          className="ContentCell"
        >
          <span>{info.getValue()}</span>
        </td>
      ),
    },

    {
      accessorKey: "modelos.marcas.nombre",
      header: "Marca",
      cell: (info) => (
        <td
          data-title="Marca"
          className="ContentCell"
        >
          <span>{info.row.original.modelos.marcas.nombre}</span>
        </td>
      ),
    },
    {
      accessorKey: "modelos.nombre",
      header: "Modelo",
      cell: (info) => (
        <td
          data-title="Modelo"
          className="ContentCell"
        >
          <span>{info.row.original.modelos.nombre}</span>
        </td>
      ),
    },
    {
      accessorKey: "centros.nombre",
      header: "Centro",
      enableColumnFilter: false,

      cell: (info) => (
        <td
          data-title="Centro"
          className="ContentCell"
        >
          <span>{info.row.original.centros.nombre}</span>
        </td>
      ),
    },
    {
      accessorKey: "departamentos.nombre",
      header: "Departamento",
      cell: (info) => (
        <td
          data-title="Departamento"
          className="ContentCell"
        >
          <span>{info.row.original.departamentos.nombre}</span>
        </td>
      ),
    },
    {
      accessorKey: "inicio_garantia",
      header: "Inicio de Garantia",
      enableColumnFilter: false,
      cell: (info) => (
        <td
          style={{ width: "100px" }}
          data-title="Inicio de Garantia"
          className="ContentCell"
        >
          <span>{info.getValue()}</span>
        </td>
      ),
    },
    {
      accessorKey: "fin_garantia",
      header: "Fin de Garantia",
      enableColumnFilter: false,

      cell: (info) => (
        <td
          style={{ width: "100px" }}
          data-title="Fin de Garantia"
          className="ContentCell"
        >
          <span>{info.getValue()}</span>
        </td>
      ),
    },
    {
      accessorKey: "estado.nombre",
      header: "Estado",
      enableColumnFilter: false,

      cell: (info) => (
        <td
          data-title="Estado"
          className="ContentCell"
        >
          <span>{info.row.original.estados.nombre}</span>
        </td>
      ),
    },
    {
      accessorKey: "accionesMarcas",
      header: "Acciones Marcas",
      enableSorting: false,
      enableColumnFilter: false,

      cell: (info) => (
        <td className="ContentCell">
          <TableActions
            editFunct={() => editar(info.row.original)}
            deleteFunct={() => eliminar(info.row.original)}
          />
        </td>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
  });
  return (
    <Container>
      <table className="responsive-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <FaSortUp />,
                      desc: <FaSortDown />,
                    }[header.column.getIsSorted()] ?? null}
                  </div>
                  {header.column.getCanFilter() ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "180px",
                      }}
                    >
                      <Filter
                        column={header.column}
                        table={table}
                      />
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((item) => (
            <tr key={item.id}>
              {item.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Paginacion
        table={table}
        irinicio={() => table.setPageIndex(0)}
        pagina={table.getState().pagination.pageIndex + 1}
        setPagina={setPagina}
        maximo={table.getPageCount()}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  margin: 5% 3%;
  @media (min-width: ${v.bpbart}) {
    margin: 2%;
  }
  @media (min-width: ${v.bphomer}) {
    margin: 2em auto;
  }
  .responsive-table {
    width: 100%;
    margin-bottom: 1.5em;
    border-spacing: 0;
    @media (min-width: ${v.bpbart}) {
      font-size: 0.7em;
    }
    @media (min-width: ${v.bpmarge}) {
      font-size: 0.8em;
    }
    thead {
      position: absolute;

      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
      @media (min-width: ${v.bpbart}) {
        position: relative;
        height: auto;
        width: auto;
        overflow: auto;
      }
      th {
        border-bottom: 2px solid rgba(115, 115, 115, 0.32);
        font-weight: normal;
        text-align: center;
        color: ${({ theme }) => theme.text};
        &:first-of-type {
          text-align: center;
        }
      }
    }
    tbody,
    tr,
    th,
    td {
      display: block;
      padding: 0;
      text-align: left;
      white-space: normal;
    }
    tr {
      @media (min-width: ${v.bpbart}) {
        display: table-row;
      }
    }

    th,
    td {
      vertical-align: middle;
      @media (min-width: ${v.bplisa}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bpbart}) {
        display: table-cell;
        padding: 0.5em;
      }
      @media (min-width: ${v.bpmarge}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bphomer}) {
        padding: 0.75em;
      }
    }
    tbody {
      @media (min-width: ${v.bpbart}) {
        display: table-row-group;
      }
      tr {
        margin-bottom: 1em;
        @media (min-width: ${v.bpbart}) {
          display: table-row;
          border-width: 1px;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
        &:nth-of-type(even) {
          @media (min-width: ${v.bpbart}) {
            background-color: rgba(78, 78, 78, 0.12);
          }
        }
      }
      th[scope="row"] {
        @media (min-width: ${v.bplisa}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }
        @media (min-width: ${v.bpbart}) {
          background-color: transparent;
          text-align: center;
          color: ${({ theme }) => theme.text};
        }
      }
      .ContentCell {
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        width: 100%;
        border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        @media (min-width: ${v.bpbart}) {
          justify-content: center;
          border-bottom: none;
        }
      }
      td {
        text-align: right;
        @media (min-width: ${v.bpbart}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
          text-align: center;
        }
      }
      td[data-title]:before {
        content: attr(data-title);
        float: left;
        font-size: 0.8em;
        @media (min-width: ${v.bplisa}) {
          font-size: 0.9em;
        }
        @media (min-width: ${v.bpbart}) {
          content: none;
        }
      }
    }
  }
`;
