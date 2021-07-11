import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostagensService } from 'src/app/service/postagens.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmarSenha: string
  tipoUsuario: boolean

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService,
    private postagemService: PostagensService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/sobrenos'])
      this.alertas.showAlertLight('Sua sessão expirou, faça o login novamente!')
    }
  }

  findByIdUser(id: number) {
    this.postagemService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }


  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.checked
  }

  atualizar() {
    this.user.instrutor = this.tipoUsuario

    if (this.user.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('Confirme a senha!')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.alertas.showAlertSuccess("Conta atualizada com sucesso, faça o login novamente!")

        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/postagens'])

      })
    }

  }

}
