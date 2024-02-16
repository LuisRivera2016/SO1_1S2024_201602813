#include <linux/module.h>
// para usar KERN_INFO
#include <linux/kernel.h>
//Header para los macros module_init y module_exit
#include <linux/init.h>
//Header necesario porque se usara proc_fs
#include <linux/proc_fs.h>
/* for copy_from_user */
#include <asm/uaccess.h>	
/* Header para usar la lib seq_file y manejar el archivo en /proc*/
#include <linux/seq_file.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("HT1 Laboratorio Sistemas Operativos 1");
MODULE_AUTHOR("Luis Rivera");

static int escribir_archivo(struct seq_file *archivo, void *v){

    seq_printf(archivo, "{\"data\":\"");
    seq_printf(archivo, "****************************************\n");
    seq_printf(archivo, "**********HOJA DE TRABAJO 1*************\n");
    seq_printf(archivo, "***************MODULOS******************\n");
    seq_printf(archivo, "****************************************\n");
    seq_printf(archivo, "\"}\n");
    return 0;

}

//FUNCION SE EJECUTARA AL MOMENTO DE REALIZAR UN CAT(LEER ARCHIVOS) AL MODULO
static int al_abrir(struct inode *inode, struct file *file){
    return single_open(file, escribir_archivo, NULL);
}

//VERIFICAR SI EL KERNEL ES 5.6 O SUPERIOR
static struct proc_ops operaciones = 
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

static int _insert(void){
    proc_create("modulo HT1",0,NULL, &operaciones);
    printk(KERN_INFO "Mensaje al insertar modulo\n");
    return 0;
}

static void _remove(void){
    remove_proc_entry("modulo HT1",NULL);
    printk(KERN_INFO "Mensaje al remover modulo\n");   
}

module_init(_insert);
module_exit(_remove);
