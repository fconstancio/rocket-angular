import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: boolean
  serie: number

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }


  ngOnInit() {
    window.scroll(0, 0)
  }
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  selectSerie(event: any) {
    this.serie = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.checked

  }

  cadastrar() {
    this.user.instrutor = this.tipoUsuario
    this.user.serie = this.serie
    if (this.user.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('A senha e a confirmação estão incorretas')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuario cadastrado com Sucesso!')

      })

    }

  }

}
