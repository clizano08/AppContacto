using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using AppContacto.Models;
using Microsoft.EntityFrameworkCore;

namespace AppContacto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly DBContactoContext _dbContactoContext;
        public ContactoController(DBContactoContext dbContactoContext)
        {
            _dbContactoContext = dbContactoContext;
        }


        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Contacto> contactos = await _dbContactoContext.Contactos
                .OrderByDescending(c => c.IdContacto).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, contactos);

        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Contacto contacto)
        {
            await _dbContactoContext.Contactos.AddAsync(contacto);
            await _dbContactoContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Contacto contacto)
        {
            _dbContactoContext.Contactos.Update(contacto);
            await _dbContactoContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Contacto contacto = _dbContactoContext.Contactos.Find(id);
            _dbContactoContext.Remove(contacto);
            await _dbContactoContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }




    }
}
