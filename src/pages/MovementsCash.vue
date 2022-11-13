<template>
  <q-page padding>
    <div class="row justify-center">
      <q-card class="q-mb-md bg-light-blue-4" style="width: 80%;">
        <q-card-section style="text-align: center;">
          <p class="text-weight-bold">Saldo Actual: S/.{{ Currenttotal.toFixed(2) }}</p>
          <p class="text-weight-bold">Monto de Egreso : S/.{{ totalExpense.toFixed(2) }}</p>
          <p class="text-weight-bold">Entradas Totales : S/.{{ totalIncomes.toFixed(2) }}</p>

        </q-card-section>
      </q-card>
    </div>
    <template v-if="false">
      <q-card class="q-mb-sm" :class="[ transaction.type == 'expense' ? 'expense':'income', ]" style="width: 100%" v-for="transaction in transactions" :key="transaction.id">
        <q-card-section class="row justify-between">
          <div>
            S/.{{ transaction.amount }} - {{ transaction.category }} - {{ transaction?.description.length > 28 ? transaction?.description.substring(0,25)+ '...': transaction?.description }}
          </div>
          <div>
            <!-- <q-btn dense round flat color="grey" @click="deleteRow(transaction)" icon="edit" aria-label="eliminar">
            </q-btn> -->
            <q-btn dense round flat color="grey" @click="deleteRow(transaction)" icon="delete" aria-label="eliminar">
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </template>

    <q-table
      title="Movimientos"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[10, 15, 25, 50, 0]"
		  v-model:pagination="pagination"
    >
    <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
    </q-table>

  </q-page>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { exportFile, useQuasar } from 'quasar';
  import { transactionformat, getStorageData, removeRecord, settospecificaccount } from 'src/composables/useStorage';
  import { categories } from 'src/utils/DefaultConfigs';

  const $q = useQuasar();
  const transactions = ref(getStorageData());

  const totalExpense = ref(0);
  const totalIncomes = ref(0);
  const Currenttotal = ref(0);

  const TotalMoney = ():void => {
    let count = 0;
    if(transactions.value){
      transactions.value.forEach((element) => {
        if(element.type == 'expense'){
          count = count - parseFloat(element.amount.toString()); 
          totalExpense.value = totalExpense.value + parseFloat(element.amount.toString());
        }else{
          count = count + parseFloat(element.amount.toString()); 
          totalIncomes.value = totalIncomes.value + parseFloat(element.amount.toString());
        }
      })
    }
    Currenttotal.value = count;
  }
  TotalMoney();

  const deleteRow = (transaction: transactionformat)=>{
    $q.dialog({
				title: 'Eliminar',
				message: '¿Deseas eliminar esta transacción?',
				ok: {
					color: 'primary',
					label: 'Si, eliminar!'
				},
				cancel: {
					flat: true,
					label: 'Cancelar'
				},
				persistent: false
			}).onOk(() => {
        /* when delete we remove record and make current calculus in totals and specific account */
        if(transactions.value){
          const index = transactions.value.findIndex((item) => item.id == transaction.id);
          
          if(index || index == 0){
            if(transaction.type = 'expense'){/* just for expense because with income we have to do another logic to make that all categories */
              const categoryIndex = categories.findIndex((category) => category == transaction.category)
              
              settospecificaccount(categoryIndex, transaction.amount, transaction.type) /* calculus en specific account */
            }
            removeRecord(index);
            transactions.value = getStorageData();
            TotalMoney(); /* total calculus  */
          }
        }
			})
  }

  

  const columns = [
  { name: 'amount', required: true, label: 'Monto', align: 'left', field: (row: { amount: number; }) => 'S/. ' + row.amount, format: (val: any) => `${val}`, sortable: true,
    style: 'width: 60px !important; max-width: 60px;',
    headerStyle: 'width: 50px !important; max-width: 50px'},
  { name: 'description', align: 'left', label: 'Description', field: 'description'},
  { name: 'category', align: 'left', label: 'Categoria', field: 'category', sortable: true },
  { name: 'type', align: 'center', label: 'Tipo', field: (row: { type: string; }) => row.type == 'expense' ? 'egreso' : 'ingreso' , sortable: true},
  { name: 'date', align: 'center', label: 'Fecha', field: 'date'},
]

const rows= transactions.value;

const pagination =  ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 20
})

function exportTable () {
  // naive encoding to csv format
  const content = [columns.map(col => wrapCsvValue(col.label))].concat(
      rows.map(row => columns.map(col => wrapCsvValue(
        typeof col.field === 'function'
          ? col.field(row)
          : row[ col.field === void 0 ? col.name : col.field ],
        col.format,
        row
      )).join(','))
  ).join('\r\n')

  const status = exportFile(
    'table-export.csv',
    content,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }
}

function wrapCsvValue (val: string, formatFn: ((arg0: any, arg1: any) => any) | undefined, row: { id: number; amount: number; category?: string | undefined; description: string; date: string | { toString: () => string; toDateString: () => string; toTimeString: () => string; toLocaleString: { (): string; (locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined): string; (locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions | undefined): string; }; toLocaleDateString: { (): string; (locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined): string; (locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions | undefined): string; }; toLocaleTimeString: { (): string; (locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined): string; (locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions | undefined): string; }; valueOf: () => number; getTime: () => number; getFullYear: () => number; getUTCFullYear: () => number; getMonth: () => number; getUTCMonth: () => number; getDate: () => number; getUTCDate: () => number; getDay: () => number; getUTCDay: () => number; getHours: () => number; getUTCHours: () => number; getMinutes: () => number; getUTCMinutes: () => number; getSeconds: () => number; getUTCSeconds: () => number; getMilliseconds: () => number; getUTCMilliseconds: () => number; getTimezoneOffset: () => number; setTime: (time: number) => number; setMilliseconds: (ms: number) => number; setUTCMilliseconds: (ms: number) => number; setSeconds: (sec: number, ms?: number | undefined) => number; setUTCSeconds: (sec: number, ms?: number | undefined) => number; setMinutes: (min: number, sec?: number | undefined, ms?: number | undefined) => number; setUTCMinutes: (min: number, sec?: number | undefined, ms?: number | undefined) => number; setHours: (hours: number, min?: number | undefined, sec?: number | undefined, ms?: number | undefined) => number; setUTCHours: (hours: number, min?: number | undefined, sec?: number | undefined, ms?: number | undefined) => number; setDate: (date: number) => number; setUTCDate: (date: number) => number; setMonth: (month: number, date?: number | undefined) => number; setUTCMonth: (month: number, date?: number | undefined) => number; setFullYear: (year: number, month?: number | undefined, date?: number | undefined) => number; setUTCFullYear: (year: number, month?: number | undefined, date?: number | undefined) => number; toUTCString: () => string; toISOString: () => string; toJSON: (key?: any) => string;[Symbol.toPrimitive]: { (hint: 'default'): string; (hint: 'string'): string; (hint: 'number'): number; (hint: string): string | number; }; }; type: 'expense' | 'income'; } | undefined) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}


</script>
<style scoped>

  .income{
    border: 1px solid #77C66E;
  }

  .expense{
    border: 1px solid rgb(255, 99, 132);
  }
</style>