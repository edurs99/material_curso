import java.util.Scanner;
public class Leituras{
    public static void main(String args[]){
        Scanner teclado; // declaro um componente do tipo scanner e chamo de teclado
        teclado = new Scanner(System.in); //este componente irá ler os dados do dispositivo padrao de entrada
        int a;
        float b;
        double c;
        System.out.println("Por Favor, digite um valor interiro");
        a = teclado.nextInt();
        System.out.println("Voce digiitou" + a);

        System.out.println("Por Favor, digite um valor float");
        b = teclado.nextFloat();
        System.out.println("Voce digiitou" + b);

        System.out.println("Por Favor, digite um valor double");
        c = teclado.nextDouble();
        System.out.println("Voce digiitou" + c);

        System.out.printf("%.1f%n",c);
        System.out.printf("%.2f%n",c);
        System.out.printf("%.3f%n",c);
    }
}
